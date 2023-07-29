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
      class: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      strength: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      agility: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      charisma: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      luck: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("character_classes");
  },
};
