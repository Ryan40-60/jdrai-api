"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { roles } = await import("../../config/enum.config.js");
    return queryInterface.addColumn("users", "role", {
      type: Sequelize.ENUM(Object.values(roles)),
      defaultValue: roles.USER,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("users", "role");
  },
};
