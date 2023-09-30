import { type IUrl } from '../interfaces/types';
import {
  generateTinyUrl,
  isValidLongUrl,
  isValidShortUrl,
  generateUUID
} from '../helpers/utils';
import { BadRequestException, NotFoundException } from '../exceptions/index';

class ShortUrlService {
  private static readonly Urls: IUrl[] = [];

  static encode(long: string): IUrl {
    const isLongUrl = isValidLongUrl(long);

    if (!isLongUrl) {
      throw new BadRequestException('Invalid URL provided');
    }

    // verify that request url is not an encoded one
    if (isValidShortUrl(long)) {
      throw new BadRequestException(
        'URL domain banned - provided URL is encoded'
      );
    }

    // has `longUrl` been encoded before ?
    const existingUrl = this.findUrl(long);

    if (existingUrl) {
      return existingUrl;
    }

    // generate shortUrl
    const shortUrl: string = generateTinyUrl();

    const url: IUrl = {
      id: generateUUID(),
      longUrl: long,
      shortUrl,
      dateCreated: new Date()
    };

    this.Urls.push(url);

    return url;
  }

  static decode(short: string): { longUrl: string } {
    // verify that url provided is a `shortUrl`
    const isShortUrl = isValidShortUrl(short);

    if (!isShortUrl) {
      throw new BadRequestException('provide a short URL to decode');
    }

    // verify that `shortUrl` exists in the data store
    const url = this.findUrl(short);

    if (!url) {
      throw new NotFoundException('short URL not found');
    }

    return { longUrl: url?.longUrl };
  }

  private static findUrl(key: string): IUrl | undefined {
    return this.Urls.find((url: IUrl) => url.shortUrl === key);
  }

  static getUrls(): readonly IUrl[] {
    return this.Urls;
  }
}

export default ShortUrlService;
