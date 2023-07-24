import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import passport from "passport";

import rateLimiter from "./middlewares/rateLimiter.middleware.js";
import {
  errorConverter,
  errorHandler,
} from "./middlewares/error.middleware.js";

import envConfig from "./config/env.config.js";
import {
  requestSuccessHandler,
  requestErrorHandler,
} from "./config/httpLogger.config.js";
import jwtStrategy from "./config/jwtStrategy.config.js";

import routes from "./routes/index.js";

const app = express();

// HTTP request logger
if (envConfig.env !== "test") {
  app.use(requestSuccessHandler);
  app.use(requestErrorHandler);
}

// CORS policy
app.use(cors());

// Parse the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Apply the rateLimiter middleware on the "/auth" route in production environment
if (envConfig.env === "production") {
  app.use("/auth", rateLimiter);
}

// Import routes
app.use(routes);

// Error handling
app.use(errorConverter);
app.use(errorHandler);

export default app;
