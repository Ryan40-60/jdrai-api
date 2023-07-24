import httpStatus from "http-status";
import passport from "passport";

import ApiError from "../class/ApiError.js";

/**
 * @description: Checks if the user is authenticated
 *
 * @returns A middleware that authenticates the user
 */
const auth = () => {
  return async (req, res, next) => {
    // Create a promise to handle the success or failure of authentication
    new Promise((resolve, reject) => {
      // Use the jwt strategy to authenticate the user
      passport.authenticate("jwt", { session: false }, (err, user) => {
        // Check for any passport errors
        if (err || !user) {
          // Reject the promise with a 401 error
          return reject(
            new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
          );
        }

        // Add the user to the request
        req.user = user;

        // Finally, resolve the promise
        resolve();
      })(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };
};

export default auth;
