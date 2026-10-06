import { type IUrl } from '../interfaces/types';
import { BadRequestException, NotFoundException } from '../exceptions/index';
import {
  generateTinyUrl,
  isValidLongUrl,
  isValidShortUrl,
  generateUUID
} from '../helpers/utils';

class ShortUrlService {
  private static readonly urls: IUrl[] = [];

  static encode(long: unknown): IUrl {
    if (!isValidLongUrl(long)) {
      throw new BadRequestException('Invalid URL provided');
    }

    // verify that requested url is not an encoded one
    if (isValidShortUrl(long)) {
      throw new BadRequestException(
        'URL domain banned - provided URL is encoded'
      );
    }

    // `longUrl` been encoded before ?
    const existingUrl = this.findUrl(long, 'LONG');

    if (existingUrl) {
      return existingUrl;
    }

    // generate shortUrl
    let shortUrl: string;
    do {
      shortUrl = generateTinyUrl();
    } while (this.findUrl(shortUrl, 'SHORT'));

    const url: IUrl = {
      id: generateUUID(),
      longUrl: long,
      shortUrl,
      dateCreated: new Date().toISOString()
    };

    this.urls.push(url);

    return url;
  }

  static decode(short: unknown): { longUrl: string } {
    // verify that url provided is a `shortUrl`
    if (!isValidShortUrl(short)) {
      throw new BadRequestException('provide a short URL to decode');
    }

    // verify that `shortUrl` exists in the data store
    const url = this.findUrl(short, 'SHORT');

    if (!url) {
      throw new NotFoundException('short URL not found');
    }

    return { longUrl: url?.longUrl };
  }

  private static findUrl(key: string, type: string): IUrl | undefined {
    if (type === 'SHORT') {
      return this.urls.find((url: IUrl) => url.shortUrl === key);
    }

    return this.urls.find((url: IUrl) => url.longUrl === key);
  }

  static get urlLinks(): IUrl[] {
    return this.urls;
  }
}

export default ShortUrlService;
