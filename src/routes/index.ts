import { Router } from 'express';
import config from '../config';
import ShortUrlRouter from './url-shortener';
import UrlAnalyticsRouter from './url-analytics';
import { invalidRoute, baseRoute } from './base';

const router = Router();

router.get('/', baseRoute);

router.use(`/api/${config.VER}/urls`, ShortUrlRouter);
router.use(`/api/${config.VER}/urls`, UrlAnalyticsRouter);
router.all('*', invalidRoute);

export default router;
