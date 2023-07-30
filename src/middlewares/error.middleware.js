import httpStatus from "http-status";
import sequelize from "sequelize";

import ApiError from "../class/ApiError.js";
import config from "../config/env.config.js";
import logger from "../config/logger.config.js";

/**
 * @description Handles Sequelize-related errors and converts them into an appropriate ApiError.
 *
 * @param {Error} err The error to be handled.
 * @param {Object} req The request associated with the error.
 * @returns {Error} The handled error.
 */
const sequelizeErrorHandler = (err, req) => {
  // Check if the error is related to sequelize
  if (!(err instanceof sequelize.Error)) {
    // If the error is not related to sequelize, return it as is
    return err;
  }

  // Validation error: Convert to ApiError with the first validation error message
  if (err instanceof sequelize.ValidationError) {
    // Extract the first validation error message
    const errorMessage =
      err.errors.length > 0 ? err.errors[0].message : "Validation error";

    // Create a new ApiError with the validation error message and relevant information
    return new ApiError(httpStatus.BAD_REQUEST, errorMessage, true, err.stack);
  }

  // Other database error: Convert to ApiError with the database error message
  if (err instanceof sequelize.DatabaseError) {
    // Create a new ApiError with the database error message and relevant information
    return new ApiError(httpStatus.BAD_REQUEST, err.message, true, err.stack);
  }

  // If the error is related to sequelize but doesn't fall into the above categories, return it as is
  return err;
};

/**
 * @description Error handling function for middleware. Converts any non-ApiError error to ApiError.
 *
 * @param {Error} err The error to handle.
 * @param {Object} req The current request.
 * @param {Object} res The response to send in case of an error.
 * @param {Function} next The function to execute after handling the error.
 */
export const errorConverter = (err, req, res, next) => {
  let error = err;

  // Convert Sequelize-related errors to ApiError
  error = sequelizeErrorHandler(error, req);

  // Convert any non-ApiError error to ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];

    // Create a new ApiError with the relevant status code, message, and stack trace
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

/**
 * @description Error handler for middlewares. Sends an appropriate error response to the client.
 *
 * @param {Error} err The error to handle.
 * @param {Object} req The request associated with the error.
 * @param {Object} res The response to send in case of an error.
 * @param {Function} next The function to execute after handling the error.
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
