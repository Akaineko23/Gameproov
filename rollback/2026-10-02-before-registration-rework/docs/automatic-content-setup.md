# Automatic local content setup

## 1. Deploy the updated Apps Script

1. Open the Google Apps Script project used by GamePageProv.
2. Replace the project files with the files from `apps-script/`, including the new `RegistrationPublicService.gs`.
3. Open **Project Settings → Script Properties**.
4. Add the required values listed in `fienta-setup.md`.
5. Do not add `LAST_PLAYER_NUMBER`; the code creates it after assigning the first number.
6. Leave `PUBLIC_REGISTRATION_COLUMNS` absent until the public fields have been approved.
7. Click **Deploy → Manage deployments → Edit**, select **New version**, and deploy.
8. Keep the resulting `/exec` URL in `assets/js/config.js` as `apiUrl`.

## 2. First Fienta import

1. In Apps Script, select `syncFientaRegistrations` in the function selector.
2. Click **Run**.
3. Grant permission to access the configured spreadsheet and make external requests to Fienta.
4. Open the `Registrations` sheet and verify that paid and unpaid tickets are present.
5. Verify that `Fienta Ticket ID` is unique and player numbers begin at 2000.
6. Run `syncFientaRegistrations` again and verify no rows or player numbers are duplicated.
7. Change a test order's payment status in Fienta, run the function again, and verify the same row changes.
8. Cancel or refund a test ticket, run the function again, and verify its row is removed.
9. Create another test ticket and verify the removed player number is not reused.

## 3. Enable hourly Fienta synchronization

Only after the tests above pass:

1. Select `installFientaSyncTrigger` in Apps Script.
2. Click **Run** and approve trigger creation if Google asks.
3. Open **Triggers** in the left sidebar.
4. Verify there is one hourly trigger for `syncFientaRegistrations`.

## 4. Approve public registration columns

Do not perform this step until the public fields are agreed separately.

After approval, open **Project Settings → Script Properties** and create `PUBLIC_REGISTRATION_COLUMNS`. Its value must be a JSON array such as:

```json
[
  {
    "header": "Player Number",
    "labels": {
      "et": "Mängija number",
      "ru": "Номер игрока",
      "en": "Player number"
    }
  }
]
```

Use only approved headers. Private and technical headers are rejected by the server.

## 5. Enable the GitHub synchronization workflow

1. Put this project in the GitHub repository used by the test site.
2. Include `.github/workflows/sync-local-content.yml` in the commit.
3. Open the repository on GitHub.
4. Open **Settings → Actions → General**.
5. Under **Workflow permissions**, select **Read and write permissions** and save.
6. Open **Actions → Sync local game content → Run workflow**.
7. Verify the run finishes successfully.
8. Verify that a commit is created only when `index.html`, `local-content.js`, or `local-registrations.js` changes.

The workflow runs every 30 minutes. GitHub's scheduler is not instantaneous and may start late during high load. Google Docs and Sheets do not provide a simple universal event that can directly rewrite repository files, so periodic synchronization is the reliable mechanism used here.

## 6. Cloudflare publication

If Cloudflare Pages is already connected to the GitHub repository, no new token is required. Confirm in Cloudflare that the test project watches the same branch. A synchronization commit then starts the existing deployment automatically.

If the repository is not connected, open **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**, choose the test repository and branch, and use `/` as the output directory for this static site. Do not add the Fienta API token to Cloudflare.

## 7. End-to-end test

1. Change a harmless test sentence in one Google Doc.
2. In GitHub, manually run **Sync local game content**, or wait for the scheduled run.
3. Verify the generated local file changes and a synchronization commit appears.
4. Verify the Cloudflare deployment completes and the test site displays the change.
5. Restore the source sentence and repeat the synchronization.
6. Add or edit a Fienta test registration and run `syncFientaRegistrations`, or wait for its hourly trigger.
7. Run the GitHub workflow and verify the local registration module changes after public columns are configured.
8. Open the test site and check **Registered players** on desktop and mobile.
9. Run the workflow again without source changes and verify it creates no commit.
