import { type Request, type Response, type NextFunction } from 'express';
import { successResponse } from '../helpers/response';
import { HttpStatusCode } from '../interfaces/types';
import UrlAnalyticsService from '../services/url-analytics';

class UrlAnalyticsController {
  static getStatistics(req: Request, res: Response, next: NextFunction): void {
    try {
      const response = UrlAnalyticsService.getStatistics(req);

      successResponse(
        res,
        HttpStatusCode.OK,
        'Short Link Statistics',
        response
      );
    } catch (error) {
      next(error);
    }
  }
}

export default UrlAnalyticsController;
