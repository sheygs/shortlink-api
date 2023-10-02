import app from '../src/index';

import request from 'supertest';

describe('Application Health', () => {
  test('Should display "okay"', async () => {
    const response = await request(app).get('/').expect(200);
    expect(response.body.code).toEqual(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toEqual('okay');
  });

  test('Should return "not found" for invalid routes', async () => {
    const response = await request(app).get('/me').expect(404);
    expect(response.body.code).toEqual(404);
    expect(response.body.status).toBe('failure');
    expect(response.body.error.message).toEqual('Unable to find /me');
  });
});

afterAll(() => {
  app.close();
});
