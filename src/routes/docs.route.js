import express from "express";
import swaggerUi from "swagger-ui-express";

import envConfig from "../config/env.config.js";

import { generateDocs, setupSwagger } from "../middlewares/docs.middleware.js";

const router = express.Router();

const postmanFile = envConfig.docs.postmanFile;
const swaggerFile = envConfig.docs.swaggerFile;

// Route for Swagger documentation
router.use(
  "/",
  generateDocs(postmanFile, swaggerFile), // Generate API documentation from Postman and Swagger files
  swaggerUi.serve, // Serve Swagger UI
  setupSwagger(swaggerFile) // Set up Swagger UI using the specified Swagger file
);

export default router;
