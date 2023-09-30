import { type Request } from 'express';
import parser from 'ua-parser-js';
import { isValidUrlPath } from '../helpers/utils';
import { type IUrl } from '../interfaces/types';
import ShortUrlService from '../services/url-shortener';
import { BadRequestException, NotFoundException } from '../exceptions/index';

class UrlAnalytics {
  static getStatistics(req: Request): IUrl {
    const { urlPath } = req.query as any;

    if (!isValidUrlPath(urlPath)) {
      throw new BadRequestException('url path must be 6 characters');
    }

    // search and extract the `urlPath` amongst the list of urls
    const url = ShortUrlService.getUrls().find((url: IUrl) => {
      const parts = url?.shortUrl?.split('/');

      const existingUrlPath = parts[parts.length - 1];

      if (urlPath === existingUrlPath) {
        // increment click on `shortUrl`
        url.clicks = url.clicks ? ++url.clicks : 1;
        return url;
      }

      return undefined;
    });

    // `urlPath` does not belong to a short url
    if (!url) {
      throw new NotFoundException('short url not found');
    }

    const { browser, device } = this.getShortLinkDeviceBrowser(req);

    url.browser = browser;

    url.device = device;

    return url;
  }

  // Get the device and browser details on which the
  // user interacted with the short link / url path
  private static getShortLinkDeviceBrowser(req: Request) {
    const ua = parser(req.headers['user-agent']);

    const browser = ua.browser;

    const device = ua.device;

    return {
      browser,
      device
    };
  }
}

export default UrlAnalytics;
