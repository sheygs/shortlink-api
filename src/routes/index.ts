import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { invalidRoute, baseRoute } from './base';
import ShortLinkRouter from './url-shortener';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 mins.',
  keyGenerator: (req, _) => req.ip // Get client's IP
});

const router = Router();

router.get('/', baseRoute);
router.use('/api', limiter);
router.use('/api/v1/urls', ShortLinkRouter);
router.all('*', invalidRoute);

export default router;
