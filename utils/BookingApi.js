// Small client for the Restful Booker API, so tests read as steps instead of raw HTTP calls.
class BookingApi {
  /** @param {import('@playwright/test').APIRequestContext} request */
  constructor(request) {
    this.request = request;
  }

  async getToken(username, password) {
    const response = await this.request.post('/auth', { data: { username, password } });
    const body = await response.json();
    return body.token;
  }

  async create(booking) {
    return this.request.post('/booking', { data: booking });
  }

  async get(id) {
    return this.request.get(`/booking/${id}`);
  }

  async list(params = {}) {
    return this.request.get('/booking', { params });
  }

  async update(id, booking, token) {
    return this.request.put(`/booking/${id}`, { data: booking, headers: { Cookie: `token=${token}` } });
  }

  async partialUpdate(id, fields, token) {
    return this.request.patch(`/booking/${id}`, { data: fields, headers: { Cookie: `token=${token}` } });
  }

  async delete(id, token) {
    return this.request.delete(`/booking/${id}`, { headers: { Cookie: `token=${token}` } });
  }
}

module.exports = { BookingApi };
