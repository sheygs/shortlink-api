import app from '../src/index';

import request from 'supertest';

describe('App', () => {
  test('Should display "okay"', async () => {
    const response = await request(app).get('/').expect(200);
    expect(response.body.code).toEqual(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toEqual('okay');
  });

  test('Should return "not found" for invalid routes', async () => {
    const response = await request(app).get('/test').expect(404);
    expect(response.body.code).toEqual(404);
    expect(response.body.status).toBe('failure');
    expect(response.body.error.message).toEqual('Unable to find /test');
  });
});

afterAll(() => {
  app.close();
});
