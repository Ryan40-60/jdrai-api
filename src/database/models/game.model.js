import { DataTypes } from "sequelize";

import sequelize from "../../config/db.config.js";

import User from "./user.model.js";
import Milestone from "./milestone.model.js";

/**
 * @description Model for the 'Game' table
 *
 * @type {class} Game
 */
const Game = sequelize.define(
  "games",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Game, { foreignKey: "id_user" });
Game.belongsTo(User, { foreignKey: "id_user" });

Milestone.hasMany(Game, { foreignKey: "id_milestone" });
Game.belongsTo(Milestone, { foreignKey: "id_milestone" });

export default Game;
