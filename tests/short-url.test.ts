import request from 'supertest';
import server from '../src/index';
// import Urls from './data/shortUrls.json';
// import ShortUrlService from '../src/services/url-shortener';

const url = '/api/v1/urls';

describe('POST /encode ', () => {
  it('should encode a long url', async () => {
    const response = await request(server).post(`${url}/encode`).send({
      longUrl: 'https://indicina.co'
    });

    expect(response.body.code).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toEqual('URL Shortened');
    expect(response.body.data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        longUrl: expect.any(String),
        shortUrl: expect.any(String),
        dateCreated: expect.any(String)
      })
    );
  });

  it('should return an error for an empty long url string provided', async () => {
    const response = await request(server).post(`${url}/encode`).send({
      longUrl: ''
    });

    expect(response.body.code).toBe(400);
    expect(response.body.status).toBe('failure');
    expect(response.body.data).toBeNull();
    expect(response.body.error).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        publicMessage: expect.any(String),
        message: expect.any(String)
      })
    );
  });

  it('should return an error for an tiny url passed', async () => {
    const response = await request(server).post(`${url}/encode`).send({
      longUrl: 'https://short.est/RcTA0i'
    });

    expect(response.body.code).toBe(400);
    expect(response.body.status).toBe('failure');
    expect(response.body.data).toBeNull();
    expect(response.body.error).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        publicMessage: expect.any(String),
        message: expect.any(String)
      })
    );
  });
});

describe('GET /decode', () => {
  it('should return an error for an empty short url string', async () => {
    const response = await request(server).get(`${url}/decode`).query({
      shortUrl: ''
    });

    expect(response.body.code).toBe(400);
    expect(response.body.status).toBe('failure');
    expect(response.body.data).toBeNull();
    expect(response.body.error).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        publicMessage: expect.any(String),
        message: expect.any(String)
      })
    );
  });

  it('should return an error for a long url passed', async () => {
    const response = await request(server).get(`${url}/decode`).query({
      shortUrl: 'https://nestjs.com/'
    });

    expect(response.body.code).toBe(400);
    expect(response.body.status).toBe('failure');
    expect(response.body.data).toBeNull();
    expect(response.body.error).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        publicMessage: expect.any(String),
        message: expect.any(String)
      })
    );
  });

  it('should return an error for an invalid short url passed', async () => {
    const response = await request(server).get(`${url}/decode`).query({
      shortUrl: 'https://cat.com/'
    });

    expect(response.body.code).toBe(400);
    expect(response.body.status).toBe('failure');
    expect(response.body.data).toBeNull();
    expect(response.body.error).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        publicMessage: expect.any(String),
        message: expect.any(String)
      })
    );
  });

  it('should return a "not found" short url', async () => {
    const response = await request(server).get(`${url}/decode`).query({
      shortUrl: 'https://short.est/KLfcTP'
    });

    expect(response.body.code).toBe(404);
    expect(response.body.status).toBe('failure');
    expect(response.body.data).toBeNull();
    expect(response.body.error).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        publicMessage: expect.any(String),
        message: expect.any(String)
      })
    );
  });
});

afterAll(() => {
  server.close();
});
