import {
  generateUUID,
  isValidShortUrl,
  isValidLongUrl,
  generateTinyUrl,
  isValidUrlPath
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

describe('Short Url', () => {
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

describe('Long Url', () => {
  it('should return false when no argument is passed', () => {
    const result = isValidLongUrl();
    expect(result).toEqual(false);
  });

  it('should return false when an empty url string is passed', () => {
    const result = isValidLongUrl('');
    expect(result).toEqual(false);
  });

  it('should return false when an invalid long url is passed', () => {
    const result = isValidLongUrl('http://cat');
    expect(result).toEqual(false);
  });

  it('should return true when a valid long url is passed', () => {
    const result = isValidLongUrl('https://indicina.co');
    expect(result).toEqual(true);
  });
});

describe('Url Path', () => {
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
    expect(result).toEqual(false);
  });

  it('should return false when the url path is passed is greater than 6 characters', () => {
    const result = isValidUrlPath('GeAi9K_');
    expect(result).toEqual(false);
  });

  it('should return true when the url path is 6 characters', () => {
    const result = isValidUrlPath('GeAi9K');
    expect(result).toEqual(true);
  });
});
