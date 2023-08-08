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
          if (value !== tokens.REFRESH) {
            throw new Error("Invalid token type");
          }
        },
      },
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Foreign key associations with corresponding tables
User.hasMany(Token, { foreignKey: "id_user" });

export default Token;
