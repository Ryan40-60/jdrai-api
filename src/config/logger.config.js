import winston from "winston";

import envConfig from "./env.config.js";

// Error message format
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// Initialize the logger with the configuration parameters
const logger = winston.createLogger({
  level: envConfig.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    envConfig.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
    new winston.transports.File({
      filename: envConfig.logger.logsFile,
      level: "info",
      format: winston.format.uncolorize(),
    }),
    new winston.transports.File({
      filename: envConfig.logger.errorFile,
      level: "error",
      format: winston.format.uncolorize(),
    }),
  ],
});

// Export the logger
export default logger;
