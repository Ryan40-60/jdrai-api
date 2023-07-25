"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("milestones", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("milestones");
  },
};
