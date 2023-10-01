import {
  generateUUID,
  isValidShortUrl,
  isValidLongUrl,
  generateTinyUrl,
  isValidUrlPath
} from '../src/helpers/utils';

describe('Generate UUID', () => {
  it('should generate a UUID string', () => {
    const result = generateUUID();
    expect(result).not.toBeNull();
    expect(result).toBeDefined();
  });
});

describe('Generate Short Urls', () => {
  it('should generate a tiny url', () => {
    const result = generateTinyUrl();
    expect(result).not.toBeNull();
    expect(result).toBeDefined();
  });
});

describe('Validate Short Url', () => {
  it('should return false for no argument passed', () => {
    const result = isValidShortUrl();
    expect(result).toEqual(false);
  });

  it('should return false for an empty url string is passed', () => {
    const result = isValidShortUrl('');
    expect(result).toBe(false);
  });

  it('should return false for an invalid tiny url is passed', () => {
    const result = isValidShortUrl('https://mark.agazie/sjeGw');
    expect(result).toBe(false);
  });

  it('should return true for a valid tiny url is passed', () => {
    const result = isValidShortUrl('https://short.est/dtADab');
    expect(result).toEqual(true);
  });
});

describe('Validate Long Url', () => {
  it('should return false for no argument passed', () => {
    const result = isValidLongUrl();
    expect(result).toBe(false);
  });

  it('should return false for an empty url string passed', () => {
    const result = isValidLongUrl('');
    expect(result).toEqual(false);
  });

  it('should return false for an invalid long url passed', () => {
    const result = isValidLongUrl('http://cat');
    expect(result).toEqual(false);
  });

  it('should return true for a  valid long url passed', () => {
    const result = isValidLongUrl('https://indicina.co');
    expect(result).toBe(true);
  });
});

describe('Short Url Path', () => {
  it('should return false when no argument is passed', () => {
    const result = isValidUrlPath();
    expect(result).toEqual(false);
  });

  it('should return false when an empty url string is passed', () => {
    const result = isValidUrlPath('');
    expect(result).toEqual(false);
  });

  it('should return false when the url path is passed is less than 6 characters', () => {
    const result = isValidUrlPath('GeAi9');
    expect(result).toBe(false);
  });

  it('should return false when the url path is passed is greater than 6 characters', () => {
    const result = isValidUrlPath('GeAi9K_');
    expect(result).toBe(false);
  });

  it('should return true when the url path is 6 characters', () => {
    const result = isValidUrlPath('GeAi9K');
    expect(result).toEqual(true);
  });
});
