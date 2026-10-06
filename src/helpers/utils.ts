import { randomUUID, randomBytes } from 'node:crypto';

export const generateUUID = (): string => randomUUID();

export const isValidLongUrl = (url: unknown = ''): url is string => {
  if (
    typeof url !== 'string' ||
    url.length > 2048 ||
    /[\s\\]/.test(url) ||
    Array.from(url).some(
      (character) =>
        character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127
    )
  )
    return false;

  try {
    const parsed = new URL(url);
    return (
      /^https?:\/\//i.test(url) &&
      ['http:', 'https:'].includes(parsed.protocol) &&
      parsed.hostname.includes('.') &&
      !parsed.username &&
      !parsed.password
    );
  } catch {
    return false;
  }
};

export const isValidShortUrl = (url: unknown = ''): url is string =>
  typeof url === 'string' &&
  /^https?:\/\/short\.est\/[A-Za-z0-9_-]{6}$/.test(url);

export const generateTinyUrl = (): string =>
  `https://short.est/${randomBytes(5).toString('base64url').slice(0, 6)}`;

export const isValidUrlPath = (urlPath: unknown = ''): urlPath is string =>
  typeof urlPath === 'string' && /^[A-Za-z0-9_-]{6}$/.test(urlPath);
