"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("character_classes", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("character_classes");
  },
};
