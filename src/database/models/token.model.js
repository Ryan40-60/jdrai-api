import { DataTypes } from "sequelize";

import sequelize from "../../config/db.config.js";
import { tokens } from "../../config/enum.config.js";

import User from "./user.model.js";

/**
 * @description Token Model representing the "tokens" table.
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
User.hasMany(Token, { foreignKey: "user_id" });

export default Token;
