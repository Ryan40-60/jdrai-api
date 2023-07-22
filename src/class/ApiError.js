/**
 * @description Adds statusCode, isOperational flag, and stack trace to the Error class.
 *
 * @class ApiError
 */
class ApiError extends Error {
  /**
   * @description Creates a new instance of ApiError.
   *
   * @param {number} statusCode - The status code associated with the error.
   * @param {string} message - The error message.
   * @param {boolean} [isOperational=true] - Indicates whether the error is operational or not.
   * @param {string} [stack=""] - The stack trace of the error.
   */
  constructor(statusCode, message, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
