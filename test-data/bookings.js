// Public demo admin credentials published on https://restful-booker.herokuapp.com/apidoc
const admin = {
  username: process.env.BOOKER_USERNAME || 'admin',
  password: process.env.BOOKER_PASSWORD || 'password123',
};

function newBooking(overrides = {}) {
  return {
    firstname: 'Lakshmi',
    lastname: `Pathi-${Date.now()}`,
    totalprice: 1500,
    depositpaid: true,
    bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
    additionalneeds: 'Breakfast',
    ...overrides,
  };
}

module.exports = { admin, newBooking };
