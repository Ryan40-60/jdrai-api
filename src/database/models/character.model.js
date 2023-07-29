import { DataTypes } from "sequelize";

import sequelize from "../../config/db.config.js";

import User from "./user.model.js";
import CharacterClass from "./characterClass.model.js";

/**
 * @description Model for the 'Character' table
 *
 * @type {class} Character
 */
const Character = sequelize.define(
  "characters",
  {
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
  },
  {
    timestamps: true,
  }
);

User.hasMany(Character, { foreignKey: "id_user" });
Character.belongsTo(User, { foreignKey: "id_user" });

CharacterClass.hasMany(Character, { foreignKey: "id_characterClass" });
Character.belongsTo(CharacterClass, { foreignKey: "id_characterClass" });

export default Character;
