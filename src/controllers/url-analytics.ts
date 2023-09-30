import { type Request, type Response, type NextFunction } from 'express';
import { successResponse } from '../helpers/response';
import UrlAnalyticsService from '../services/url-analytics';

class UrlAnalyticsController {
  static getStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const response = UrlAnalyticsService.getStatistics(req);

      successResponse(res, 200, 'stats. details retrieved', response);
    } catch (error) {
      next(error);
    }
  }
}

export default UrlAnalyticsController;
