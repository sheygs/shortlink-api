import server from '../src/index';
import request from 'supertest';
// import Urls from './data/shortUrls.json';

describe('POST /encode ', () => {
  it('should encode a long url to a tiny url', async () => {
    const response = await request(server).post('/encode').send({
      longUrl: 'https://indicina.co'
    });

    // console.log({ response });

    expect(response.body.code).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toEqual('URL Shortened');
    expect(response.body.data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        longUrl: expect.any(String),
        shortUrl: expect.any(String),
        dateCreated: expect.any(Date)
      })
    );
  });
});

afterAll(() => {
  server.close();
});
