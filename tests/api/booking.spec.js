const { test, expect } = require('@playwright/test');
const { BookingApi } = require('../../utils/BookingApi');
const { admin, newBooking } = require('../../test-data/bookings');

test.describe('Booking API', () => {
  /** @type {BookingApi} */
  let api;
  let token;

  test.beforeEach(async ({ request }) => {
    api = new BookingApi(request);
    token = await api.getToken(admin.username, admin.password);
    expect(token, 'auth token').toBeTruthy();
  });

  test('creates a booking and reads it back @smoke', async () => {
    const booking = newBooking();

    const created = await api.create(booking);
    expect(created.status()).toBe(200);
    const { bookingid, booking: saved } = await created.json();
    expect(bookingid).toEqual(expect.any(Number));
    expect(saved).toEqual(booking);

    const fetched = await api.get(bookingid);
    expect(fetched.status()).toBe(200);
    expect(await fetched.json()).toEqual(booking);
  });

  test('finds a booking by guest name', async () => {
    const booking = newBooking();
    const { bookingid } = await (await api.create(booking)).json();

    const response = await api.list({ firstname: booking.firstname, lastname: booking.lastname });
    expect(response.status()).toBe(200);
    const ids = (await response.json()).map((b) => b.bookingid);
    expect(ids).toContain(bookingid);
  });

  test('updates a booking with PUT', async () => {
    const { bookingid } = await (await api.create(newBooking())).json();
    const updated = newBooking({ totalprice: 2500, additionalneeds: 'Late checkout' });

    const response = await api.update(bookingid, updated, token);
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(updated);
  });

  test('partially updates a booking with PATCH', async () => {
    const booking = newBooking();
    const { bookingid } = await (await api.create(booking)).json();

    const response = await api.partialUpdate(bookingid, { totalprice: 999 }, token);
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ ...booking, totalprice: 999 });
  });

  test('deletes a booking', async () => {
    const { bookingid } = await (await api.create(newBooking())).json();

    const response = await api.delete(bookingid, token);
    expect(response.status()).toBe(201);

    const fetched = await api.get(bookingid);
    expect(fetched.status()).toBe(404);
  });

  test('rejects update without a valid token', async () => {
    const { bookingid } = await (await api.create(newBooking())).json();

    const response = await api.update(bookingid, newBooking(), 'invalid-token');
    expect(response.status()).toBe(403);
  });

  test('rejects login with wrong credentials', async ({ request }) => {
    const response = await request.post('/auth', { data: { username: 'admin', password: 'wrong' } });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ reason: 'Bad credentials' });
  });
});
