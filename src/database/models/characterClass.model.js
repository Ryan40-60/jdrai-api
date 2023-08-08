import { DataTypes } from "sequelize";

import sequelize from "../../config/db.config.js";

/**
 * @description Model for the 'CharacterClass' table
 *
 * @type {class} CharacterClass
 */
const CharacterClass = sequelize.define("character_classes", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  strength: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  agility: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  charisma: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  luck: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default CharacterClass;
