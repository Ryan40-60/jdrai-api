import httpStatus from "http-status";
import passport from "passport";

import ApiError from "../class/ApiError.js";

import { roles } from "../config/enum.config.js";

/**
 * @description: Checks whether the user is authenticated and, if necessary, an administrator.
 *
 * @params {boolean} admin - Check if the user is admin if true
 * @returns A middleware that authenticates the user
 */
const auth = (admin) => {
  return async (req, res, next) => {
    // Create a promise to handle the success or failure of authentication
    new Promise((resolve, reject) => {
      // Use the jwt strategy to authenticate the user
      passport.authenticate("jwt", { session: false }, (err, user) => {
        // Check for any passport errors
        if (err || !user) {
          // Reject the promise with a 401 error
          return reject(
            new ApiError(httpStatus.UNAUTHORIZED, "Veuillez vous authentifier")
          );
        }

        // Add the user to the request
        req.user = user;

        // Check if the user is an admin if necessary
        if (admin && user.role !== roles.ADMIN) {
          // Reject the promise with a 403 error
          return reject(new ApiError(httpStatus.FORBIDDEN, "Non autorisé"));
        }

        // Finally, resolve the promise
        resolve();
      })(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };
};

export default auth;
