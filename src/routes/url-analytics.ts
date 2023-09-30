import { Router } from 'express';
import UrlAnalyticsController from '../controllers/url-analytics';

const UrlAnalyticsRouter = Router();

UrlAnalyticsRouter.route('/statistics').get(
  UrlAnalyticsController.getStatistics
);

export default UrlAnalyticsRouter;
