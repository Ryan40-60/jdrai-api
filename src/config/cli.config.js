import envConfig from "./env.config.js";

// Command line configuration for different environments
const cliConfig = {
  production: {
    // Database user for production
    username: envConfig.sequelize.user,
    // Database password for production
    password: envConfig.sequelize.password,
    // Database name for production
    database: envConfig.sequelize.database,
    // Database host for production
    host: envConfig.sequelize.host,
    // Database port for production
    port: envConfig.sequelize.port,
    // Database dialect type (Postgres) for production
    dialect: "postgres",
  },
  development: {
    // Database user for development
    username: envConfig.sequelize.user,
    // Database password for development
    password: envConfig.sequelize.password,
    // Database name for development
    database: envConfig.sequelize.database,
    // Database host for development
    host: envConfig.sequelize.host,
    // Database port for development
    port: envConfig.sequelize.port,
    // Database dialect type (Postgres) for development
    dialect: "postgres",
  },
  test: {
    // Database user for tests
    username: envConfig.sequelize.testUser,
    // Database password for tests
    password: envConfig.sequelize.testPassword,
    // Database name for tests
    database: envConfig.sequelize.testDatabase,
    // Database host for tests
    host: envConfig.sequelize.host,
    // Database port for tests
    port: envConfig.sequelize.port,
    // Database dialect type (Postgres) for tests
    dialect: "postgres",
  },
};

export default cliConfig;
