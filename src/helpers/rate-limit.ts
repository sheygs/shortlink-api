import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'You can only make 5 requests per minute. Please try again later',
  keyGenerator: (req, _) => req.ip // Get client's IP
});
