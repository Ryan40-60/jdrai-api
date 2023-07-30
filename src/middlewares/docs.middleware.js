import fs from "fs";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import postmanToOpenApi from "postman-to-openapi";

import envConfig from "../config/env.config.js";
import logger from "../config/logger.config.js";

/**
 * @description Generates Swagger documentation on-the-fly from a Postman file.
 *
 * @param {string} postmanFile - Path to the Postman file
 * @param {string} swaggerFile - Path to the Swagger file
 * @returns {Function} - Middleware that generates the Swagger documentation
 */
export const generateDocs = (postmanFile, swaggerFile) => {
  return async (req, res, next) => {
    let postman;
    let swagger;
    let swaggerExists = true;
    let swaggerExpired = false;

    // Retrieve the Postman file
    try {
      postman = fs.statSync(postmanFile);
    } catch (err) {
      return next(err);
    }

    // Retrieve the Swagger file if it exists
    try {
      swagger = fs.statSync(swaggerFile);
    } catch (err) {
      swaggerExists = false;
    }

    // Compare modification dates of both files
    if (swaggerExists) {
      // If the Swagger file's modification date is older than the Postman file's, the Swagger is no longer valid
      swaggerExpired = swagger.mtime.getTime() < postman.mtime.getTime();
    }

    // If the Swagger file doesn't exist or it's no longer valid, then regenerate it
    if (!swaggerExists || swaggerExpired) {
      // If the application environment is development, log the generation process
      if (envConfig.env === "development") {
        logger.info("Generating Swagger...");
      }
      // Convert the Postman file to OpenAPI (Swagger) format using postmanToOpenApi function
      postmanToOpenApi(postmanFile, swaggerFile)
        .then(() => next()) // Continue to the next middleware after successful generation
        .catch((err) => next(err)); // Pass any error to the next middleware for error handling
    } else {
      // If the Swagger file exists and is still valid, move to the next middleware
      next();
    }
  };
};

/**
 * @description Loads the Swagger file and sets up the Swagger UI page.
 *
 * @param {string} swaggerFile - Path to the Swagger file
 * @returns {Function} - Middleware that provides the Swagger UI HTML code
 */
export const setupSwagger = (swaggerFile) => {
  try {
    // Load the Swagger file using YAML.load
    const swagger = YAML.load(swaggerFile);

    // Set the base URL for the Swagger UI page to "/"
    swagger.servers[0].url = "/";

    // Return the Swagger UI setup middleware with the loaded Swagger configuration
    return swaggerUi.setup(swagger);
  } catch (err) {
    // If there was an error loading the Swagger file, return the Swagger UI setup middleware with null
    // This will display an error message on the Swagger UI page
    return swaggerUi.setup(null);
  }
};
