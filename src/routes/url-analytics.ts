import { Router } from 'express';
import UrlAnalyticsController from '../controllers/url-analytics';

const UrlAnalyticsRouter = Router();

UrlAnalyticsRouter.route('/statistic').get(
  UrlAnalyticsController.getStatistics
);

export default UrlAnalyticsRouter;
