import { type Request, type Response, type NextFunction } from 'express';
import { successResponse } from '../helpers/response';
import ShortUrlService from '../services/url-shortener';

class ShortUrlController {
  static encode(req: Request, res: Response, next: NextFunction): void {
    try {
      const { longUrl } = req.body;

      const response = ShortUrlService.encode(longUrl);

      successResponse(res, 201, 'URL shortened', response);
    } catch (error) {
      next(error);
    }
  }

  static decode(req: Request, res: Response, next: NextFunction): void {
    try {
      const { shortUrl } = req.query as any;

      const { longUrl } = ShortUrlService.decode(shortUrl);

      res.redirect(longUrl);
    } catch (error) {
      next(error);
    }
  }
}

export default ShortUrlController;
