import dotenv from "dotenv";
import Joi from "joi";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Use import.meta.url to get the URL of the current module file
const currentFileUrl = import.meta.url;

// Convert the URL to a file path
const currentFilePath = fileURLToPath(currentFileUrl);

// Get the directory name of the current module
const currentDir = dirname(currentFilePath);

// Load environment variables from the .env file using the correct directory path
dotenv.config({ path: path.join(currentDir, "../../.env") });

// Environment variables validation schema
const envSchema = Joi.object()
  .keys({
    // Application Configuration
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),

    // Database Configuration
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),

    // Test Database Configuration
    TEST_DB_USER: Joi.string().required(),
    TEST_DB_PASSWORD: Joi.string().required(),
    TEST_DB_NAME: Joi.string().required(),

    // JWT Configuration
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRE_MINUTES: Joi.string().default(120),
    JWT_REFRESH_EXPIRE_DAYS: Joi.string().default(1),

    // Documentation Configuration
    POSTMAN_FILE: Joi.string().default(
      "src/docs/jdrai-api.postman_collection.json"
    ),
    SWAGGER_FILE: Joi.string().default("src/docs/swagger.yml"),

    // Logs Configuration
    LOGS_FILE: Joi.string().default("logs/combined.log"),
    ERROR_FILE: Joi.string().default("logs/error.log"),
  })
  .unknown();

// Validate environment variables
const { value: env, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

// Handling validation errors
if (error) {
  throw new Error(`Configuration validation error: ${error.message}`);
}

const envConfig = {
  // Application Configuration
  env: env.NODE_ENV,
  port: env.PORT,
  uploadDirectory: env.UPLOAD_DIR,

  sequelize: {
    // Database Configuration
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,

    // Test Database Configuration
    testUser: env.TEST_DB_USER,
    testPassword: env.TEST_DB_PASSWORD,
    testDatabase: env.TEST_DB_NAME,
  },

  // JWT Configuration
  jwt: {
    secret: env.JWT_SECRET,
    accessExpirationMinutes: env.JWT_ACCESS_EXPIRE_MINUTES,
    refreshExpirationDays: env.JWT_REFRESH_EXPIRE_DAYS,
  },

  // Documentation Configuration
  docs: {
    postmanFile: env.POSTMAN_FILE,
    swaggerFile: env.SWAGGER_FILE,
  },

  // Logs Configuration
  logger: {
    logsFile: env.LOGS_FILE,
    errorFile: env.ERROR_FILE,
  },
};

export default envConfig;
