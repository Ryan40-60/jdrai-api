import { DataTypes } from "sequelize";

import sequelize from "../../config/db.config.js";

/**
 * @description Model for the 'Milestone' table
 *
 * @type {class} Milestone
 */
const Milestone = sequelize.define("milestones", {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Milestone;
