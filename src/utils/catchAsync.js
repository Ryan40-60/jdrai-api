/**
 * @description: Encapsulate a middleware to catch potential errors.
 *
 * @param {function} middleware - The middleware to encapsulate
 * @returns A middleware that knows how to handle errors
 */
const catchAsync = (middleware) => {
  return (req, res, next) => {
    Promise.resolve(middleware(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
