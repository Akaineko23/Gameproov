const PRIVATE_REGISTRATION_HEADERS = [
  'Last Synced At',
  'Fienta Event ID',
  'Fienta Order ID',
  'Fienta Ticket ID',
  'Email',
  'Payment Status',
  'Ticket Status',
  'Fienta Status',
  'Checked In',
  'Checked In At',
  'Raw Event Type',
  'Buyer Email',
];

function getPublicRegistrations_(language) {
  const columns = getPublicRegistrationColumns_(language);

  if (!columns.length) {
    return {
      success: true,
      columns: [],
      rows: [],
    };
  }

  const sheet = getRegistrationSheet_();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return {
      success: true,
      columns: columns.map(publicColumnResponse_),
      rows: [],
    };
  }

  const values = sheet
    .getRange(2, 1, lastRow - 1, REGISTRATION_HEADERS.length)
    .getDisplayValues();
  const rows = values.map(function (row) {
    return columns.map(function (column) {
      return row[column.index] || '';
    });
  });

  return {
    success: true,
    columns: columns.map(publicColumnResponse_),
    rows: rows,
  };
}

function getPublicRegistrationColumns_(language) {
  const rawValue = PropertiesService
    .getScriptProperties()
    .getProperty('PUBLIC_REGISTRATION_COLUMNS');

  if (!rawValue) {
    return [];
  }

  let configuredColumns;

  try {
    configuredColumns = JSON.parse(rawValue);
  } catch (error) {
    throw new Error('PUBLIC_REGISTRATION_COLUMNS_INVALID');
  }

  if (!Array.isArray(configuredColumns)) {
    throw new Error('PUBLIC_REGISTRATION_COLUMNS_INVALID');
  }

  return configuredColumns.map(function (configuredColumn) {
    const header = String(configuredColumn.header || '');
    const labels = configuredColumn.labels || {};
    const index = REGISTRATION_HEADERS.indexOf(header);

    if (index < 0 || PRIVATE_REGISTRATION_HEADERS.indexOf(header) >= 0) {
      throw new Error('PUBLIC_REGISTRATION_COLUMNS_INVALID');
    }

    return {
      key: header,
      label: String(labels[language] || labels.en || header),
      index: index,
    };
  });
}

function publicColumnResponse_(column) {
  return {
    key: column.key,
    label: column.label,
  };
}
