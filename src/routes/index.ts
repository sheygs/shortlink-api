import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { invalidRoute, baseRoute } from './base';
import config from '../config';
import ShortUrlRouter from './url-shortener';
import UrlAnalyticsRouter from './url-analytics';

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'You have exceeded the 5 requests per minute limit',
  keyGenerator: (req, _) => req.ip // Get client's IP
});

const router = Router();

router.get('/', baseRoute);
router.use('/api', limiter);
router.use(`/api/${config.VER}/urls`, ShortUrlRouter);
router.use(`/api/${config.VER}/urls`, UrlAnalyticsRouter);
router.all('*', invalidRoute);

export default router;
