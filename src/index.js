import app from "./app.js";

import envConfig from "./config/env.config.js";
import sequelize from "./config/db.config.js";
import logger from "./config/logger.config.js";

// Server Startup
const server = app.listen(envConfig.port, async () => {
  try {
    // Check Database Connection
    await sequelize.authenticate();
    logger.info("Connection to the database established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }

  logger.info(`The application is listening on port ${envConfig.port}`);
});

// Exit Handler
const exitHandler = () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// Unexpected Error Handler
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

// Listen for Unexpected Error and Unhandled Rejection Events
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// Listen for SIGTERM Signal to Gracefully Close the Server
process.on("SIGTERM", () => {
  logger.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
