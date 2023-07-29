import { DataTypes } from "sequelize";

import sequelize from "../../config/db.config.js";

/**
 * @description Model for the 'Class' table
 *
 * @type {class} Class
 */
const Class = sequelize.define("classes", {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  force: {
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
  chance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Class;
