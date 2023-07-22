import moment from "moment";
import morgan from "morgan";

import envConfig from "./env.config.js";
import logger from "./logger.config.js";

// Add a token to display an error message
morgan.token("message", (req, res) => res.locals.errorMessage || "");

// Add a token to display the date with the Paris time zone
morgan.token("date", (req, res, tz) => moment().tz(tz).format());

// Define the display format for the IP address based on the environment
const getIpFormat = () =>
  envConfig.env === "production" ? ":remote-addr - " : "";

// Success response format
const successResponseFormat = `[:date[Europe/Paris]] ${getIpFormat()}:method :url :status - :response-time ms`;

// Error response format
const errorResponseFormat = `[:date[Europe/Paris]] ${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

// Success handler
export const requestSuccessHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

// Error handler
export const requestErrorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});
