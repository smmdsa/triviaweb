import rateLimit from 'express-rate-limit'

export const embedRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 600, // 10 RPS * 60s
  standardHeaders: true,
  legacyHeaders: false,
})