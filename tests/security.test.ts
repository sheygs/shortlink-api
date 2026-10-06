import express from 'express';
import request from 'supertest';
import { middlewares } from '../src/app';
import { limiter } from '../src/helpers/rate-limit';
import { globalErrorHandler } from '../src/middlewares/error';
import {
  isValidLongUrl,
  isValidShortUrl,
  isValidUrlPath
} from '../src/helpers/utils';

const app = express();
middlewares(app);

const maliciousUrls = [
  'javascript:alert(1)//example.com',
  'data:text/html,https://example.com',
  '//example.com',
  'example.com',
  'https://user:password@example.com',
  'https://example.com\r\nLocation:evil',
  'https://example.com\\evil',
  'https://example.com/' + 'x'.repeat(2048),
  ['https://example.com'],
  { url: 'https://example.com' },
  null,
  42
];

describe('Input security', () => {
  test.each(maliciousUrls)('rejects unsafe URL %p', (url) => {
    expect(isValidLongUrl(url)).toBe(false);
  });

  test.each([['GeAi9K'], { path: 'GeAi9K' }, null, 42])(
    'rejects non-string query input %p',
    (value) => {
      expect(isValidUrlPath(value)).toBe(false);
      expect(isValidShortUrl(value)).toBe(false);
    }
  );

  test('accepts the full generated short URL alphabet', () => {
    expect(isValidShortUrl('https://short.est/A_-z09')).toBe(true);
  });

  test('returns 400 for a dangerous redirect target', async () => {
    await request(app)
      .post('/api/v1/urls/encode')
      .send({ longUrl: maliciousUrls[0] })
      .expect(400);
  });

  test('returns 400 for repeated query parameters', async () => {
    await request(app)
      .get('/api/v1/urls/statistic?urlPath=GeAi9K&urlPath=GeAi9K')
      .expect(400);
  });

  test('returns 400 for a missing body', async () => {
    await request(app).post('/api/v1/urls/encode').expect(400);
  });

  test('returns 413 with a request ID for oversized JSON', async () => {
    const response = await request(app)
      .post('/api/v1/urls/encode')
      .send({ longUrl: 'x'.repeat(17000) })
      .expect(413);
    expect(response.body.error.id).toEqual(expect.any(String));
  });

  test('does not disclose malformed JSON', async () => {
    const response = await request(app)
      .post('/api/v1/urls/encode')
      .set('Content-Type', 'application/json')
      .send('{"secret":')
      .expect(400);
    expect(response.body.error.message).toBe('Invalid JSON body');
  });

  test('does not disclose unexpected errors', async () => {
    const failingApp = express();
    failingApp.get('/', () => {
      throw new Error('database password');
    });
    globalErrorHandler(failingApp);
    const response = await request(failingApp).get('/').expect(500);
    expect(response.body.error.message).toBe('Internal Server Error');
    expect(JSON.stringify(response.body)).not.toContain('database password');
  });

  test('does not allow spoofed forwarding headers to bypass rate limits', async () => {
    const limitedApp = express();
    limitedApp.set('trust proxy', false);
    limitedApp.use(limiter);
    limitedApp.get('/', (_req, res) => {
      res.sendStatus(200);
    });
    for (let i = 0; i < 5; i++) {
      await request(limitedApp)
        .get('/')
        .set('X-Forwarded-For', `192.0.2.${i + 1}`)
        .expect(200);
    }
    await request(limitedApp)
      .get('/')
      .set('X-Forwarded-For', '192.0.2.100')
      .expect(429);
  });
});
