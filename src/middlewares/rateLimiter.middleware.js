import rateLimit from "express-rate-limit";

// Create a rate limiter
const rateLimiter = rateLimit({
  // Time window in ms, 15 minutes
  windowMs: 15 * 60 * 1000,
  // Maximum number of allowed requests within the time window
  max: 20,
  // Skip successful requests
  skipSuccessfulRequests: true,
});

export default rateLimiter;
