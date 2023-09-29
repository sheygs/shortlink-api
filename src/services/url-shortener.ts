import { type IUrl } from '../interfaces/types';
import {
  generateTinyUrl,
  isValidUrl,
  isValidShortUrl,
  generateUUID
} from '../helpers/utils';
import { BadRequestException, NotFoundException } from '../exceptions/index';

class ShortUrlService {
  private static readonly Urls: IUrl[] = [];

  static encode(longUrl: string): IUrl {
    const isLongUrl = isValidUrl(longUrl);

    if (!isLongUrl) {
      throw new BadRequestException('Invalid URL provided');
    }

    // verify that request url is not an encoded one
    if (isValidShortUrl(longUrl)) {
      throw new BadRequestException(
        'URL domain banned - provided URL is encoded'
      );
    }

    // has `long Url` been encoded before ?
    const existingUrl = this.Urls.find((url: IUrl) => url.longUrl === longUrl);

    if (existingUrl) {
      return existingUrl;
    }

    // generate shortUrl
    const shortUrl = generateTinyUrl();

    const url: IUrl = {
      id: generateUUID(),
      longUrl,
      shortUrl,
      dateCreated: new Date()
    };

    this.Urls.push(url);

    return url;
  }

  static decode(shortUrl: string) {
    // verify if url provided is a `shortUrl`
    const isShortUrl = isValidShortUrl(shortUrl);

    if (!isShortUrl) {
      throw new BadRequestException('provide a short URL to decode');
    }

    // verify if `shortUrl` exists in the data store
    const url = this.Urls.find((url: IUrl) => url.shortUrl === shortUrl);

    if (!url) {
      throw new NotFoundException('short URL not found');
    }

    return { longUrl: url?.longUrl };
  }
}

export default ShortUrlService;
