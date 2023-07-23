import httpStatus from "http-status";
import Joi from "joi";

import ApiError from "../class/ApiError.js";
import { createSubset } from "../utils/generic.js";

/**
 * @description : Middleware for validating data received by the API
 *
 * @param {*} schema - The validation schema to use
 * @returns - A validation middleware for JOI
 */
const validate = (schema) => {
  return (req, res, next) => {
    // Extract parts of the request to validate based on the schema
    const validSchema = createSubset(schema, ["params", "query", "body"]);
    const dataToValidate = createSubset(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      // Set validation preferences
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(dataToValidate);

    // If a validation error is detected
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      // Send an HTTP 400 Bad Request error
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    // Add the validated data to the request
    Object.assign(req, value);
    next();
  };
};

export default validate;
