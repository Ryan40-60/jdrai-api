import { Sequelize } from "sequelize";

import envConfig from "./env.config.js";

// Database connection URL based on the environment
const databaseUrl =
  envConfig.env !== "test"
    ? `postgres://${envConfig.sequelize.user}:${envConfig.sequelize.password}@${envConfig.sequelize.host}:${envConfig.sequelize.port}/${envConfig.sequelize.database}`
    : `postgres://${envConfig.sequelize.testUser}:${envConfig.sequelize.testPassword}@${envConfig.sequelize.host}:${envConfig.sequelize.port}/${envConfig.sequelize.testDatabase}`;

// Initialize Sequelize with the connection URL
const sequelize = new Sequelize(databaseUrl, {
  logging: false,
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
