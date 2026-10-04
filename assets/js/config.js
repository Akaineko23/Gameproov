export const config = {
  apiUrl: 'https://script.google.com/macros/s/AKfycbyrUc7ByCN9yCuv53JZPw9om76KuwLZUWdMw06TqFUpCKa509UInn3uesJcVhdyzPQ/exec',

  fienta: {
    eventUrl: 'https://fienta.com/et/proov-68644',
    embedEnabled: false,
  },

  game: {
    name: 'Undertail',
    date: '24.10.2026',
 
    location: 'Kadila raketibaas',

    mapUrl: 'https://maps.app.goo.gl/6uLXVncmYRrDBbps5',
    mapImage: 'Pics/Map/Kadila_aerial_preview.png',

    times: {
      arrival: '8.00',
      registration: '8.00–10.30',
      briefing: '11.00',
      game: '12.00–18.00',
    },

    ticketWaves: [
      {
        key: 'earlyBird',
        price: '25 €',
        dates: '14.09–04.10',
      },
      {
        key: 'lateBird',
        price: '35 €',
        dates: '05.10–23.10',
      },
      {
        key: 'onSite',
        price: '50 €',
        dates: '',
      },
    ],

    contactEmail: 'undertail.airsoft.game@gmail.com',

    sides: {
      side1: {
        name: 'Pokemon',
        color: '#315f75',
      },
      side2: {
        name: 'Digimon',
        color: '#7a3f62',
      },
    },

    friends: [
      {
        name: 'AW Facebook',
        url: 'https://www.facebook.com/airsoftwars/',
        image: 'Pics/Icons/AW patch.png',
      },
      {
        name: 'AW Telegram',
        url: 'https://t.me/+BIJZNFFeokEyZGVk',
        image: 'Pics/Icons/AW patch.png',
      },
      {
        name: 'X Force Pood',
        url: 'https://www.airsofthpa.ee/',
        image: 'Pics/Icons/XForceisp.png',
      },
      {
        name: 'Lahingurada Pood',
        url: 'https://lahingupood.ee',
        image: 'Pics/Icons/Lahingurada.png',
      },
      {
        name: '@himmelreich.photo',
        url: 'https://www.instagram.com/himmelreich.photo?stkn=dHo0czF3NTQycGk2',
        image: 'Pics/Icons/Alinst.png',
      },
    ],
  },
};
