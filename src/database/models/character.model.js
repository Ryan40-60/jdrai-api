import { DataTypes } from "sequelize";

import sequelize from "../../config/db.config.js";

import User from "./user.model.js";
import Class from "./class.model.js";

/**
 * @description Model for the 'Character' table
 *
 * @type {class} Character
 */
const Character = sequelize.define("characters", {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
});

User.hasMany(Character, { foreignKey: "id_user" });
Character.belongsTo(User, { foreignKey: "id_user" });

Class.hasMany(Character, { foreignKey: "id_class" });
Character.belongsTo(Class, { foreignKey: "id_class" });

export default Character;
