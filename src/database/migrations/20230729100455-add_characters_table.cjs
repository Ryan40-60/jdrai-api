"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("characters", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id_user: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      id_characterClass: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "character_classes",
          key: "id",
        },
      },
      name: {
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("characters");
  },
};
