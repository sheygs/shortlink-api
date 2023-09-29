import {
  generateUUID,
  isValidShortUrl,
  isValidUrl,
  generateTinyUrl
} from '../src/helpers/utils';

describe('RequestId', () => {
  it('should generate a UUID string', () => {
    const result = generateUUID();
    expect(result).not.toBeNull();
    expect(result).toBeDefined();
  });
});

describe('Generate Short Link', () => {
  it('should generate a Tiny Url', () => {
    const result = generateTinyUrl();
    expect(result).not.toBeNull();
    expect(result).toBeDefined();
  });
});

describe('Valid Short Url', () => {
  it('should return false when no argument is passed', () => {
    const result = isValidShortUrl();
    expect(result).toEqual(false);
  });

  it('should return false when an empty url string is passed', () => {
    const result = isValidShortUrl('');
    expect(result).toEqual(false);
  });

  it('should return false when an invalid tiny url is passed', () => {
    const result = isValidShortUrl('https://mark.agazie/sjeGw');
    expect(result).toEqual(false);
  });

  it('should return true when a valid tiny url is passed', () => {
    const result = isValidShortUrl('https://sheygs.io/dtADab');
    expect(result).toEqual(true);
  });
});

describe('Valid Long Url', () => {
  it('should return false when no argument is passed', () => {
    const result = isValidUrl();
    expect(result).toEqual(false);
  });

  it('should return false when an empty url string is passed', () => {
    const result = isValidUrl('');
    expect(result).toEqual(false);
  });

  it('should return false when an invalid long url is passed', () => {
    const result = isValidUrl('http://cat');
    expect(result).toEqual(false);
  });

  it('should return true when a valid long url is passed', () => {
    const result = isValidUrl('https://indicina.co');
    expect(result).toEqual(true);
  });
});
