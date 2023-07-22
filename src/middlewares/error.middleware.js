import httpStatus from "http-status";
import sequelize from "sequelize";

import ApiError from "../class/ApiError.js";
import config from "../config/env.config.js";
import logger from "../config/logger.config.js";

/**
 * @description Handles Sequelize-related errors and converts them into an appropriate ApiError.
 *
 * @param {*} err The error to be handled.
 * @param {*} req The request associated with the error.
 * @returns The handled error.
 */
const sequelizeErrorHandler = (err, req) => {
  // Check if the error is related to sequelize
  if (!(err instanceof sequelize.Error)) {
    return err;
  }

  // Validation error: Convert to ApiError with the first validation error message
  if (err instanceof sequelize.ValidationError) {
    return new ApiError(
      httpStatus.BAD_REQUEST,
      err.errors.shift().message,
      true,
      err.stack
    );
  }

  // Other database error: Convert to ApiError with the database error message
  if (err instanceof sequelize.DatabaseError) {
    return new ApiError(httpStatus.BAD_REQUEST, err.message, true, err.stack);
  }

  return err;
};

/**
 * @description Error handling function for middleware. Converts any non-ApiError error to ApiError.
 *
 * @param {*} err The error to handle.
 * @param {*} req The current request.
 * @param {*} res The response to send in case of an error.
 * @param {*} next The function to execute after handling the error.
 */
export const errorConverter = (err, req, res, next) => {
  let error = err;

  // Convert Sequelize-related errors to ApiError
  error = sequelizeErrorHandler(error, req);

  // Convert any non-ApiError error to ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

/**
 * @description Error handler for middlewares. Sends an appropriate error response to the client.
 *
 * @param {Error} err The error to handle.
 * @param {*} req The request associated with the error.
 * @param {*} res The response to send in case of an error.
 * @param {*} next The function to execute after handling the error.
 */
export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Hide error details in production for non-operational errors
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  // Store the error message in res.locals for future use
  res.locals.errorMessage = err.message;

  // Build the error response
  const response = {
    code: statusCode,
    message: message,
    ...(config.env !== "production" && { stack: err.stack }), // Include stack trace in development mode only
  };

  // Log the error in the console during development
  if (config.env === "development") {
    logger.error(err);
  }

  // Send the error response to the client
  res.status(statusCode).send(response);
};
