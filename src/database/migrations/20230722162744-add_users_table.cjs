"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { roles } = await import("../../config/enum.config.js");
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      role: {
        type: Sequelize.ENUM(Object.values(roles)),
        defaultValue: roles.USER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        trim: true,
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      password: {
        type: Sequelize.STRING,
        trim: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
