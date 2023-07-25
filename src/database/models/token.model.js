import { DataTypes } from "sequelize";

import sequelize from "../../config/db.config.js";
import { tokens } from "../../config/enum.config.js";

import User from "./user.model.js";

/**
 * @description Model for the 'Token' table
 *
 * @type {class} Token
 */
const Token = sequelize.define(
  "tokens",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        customValidator: (value) => {
          const enums = [tokens.REFRESH];
          if (!enums.includes(value)) {
            throw new Error("Not a valid option");
          }
        },
      },
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

// Foreign key associations with corresponding tables
User.hasMany(Token, { foreignKey: "id_user" });

export default Token;
