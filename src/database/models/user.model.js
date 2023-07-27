import bcrypt from "bcryptjs";
import { DataTypes } from "sequelize";

import sequelize from "../../config/db.config.js";
import { roles } from "../../config/enum.config.js";

/**
 * @description Model for the 'User' table
 *
 * @type {class} User
 */
const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    password: {
      type: DataTypes.STRING,
      trim: true,
    },
    role: {
      type: DataTypes.ENUM(Object.values(roles)),
      defaultValue: roles.USER,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

/**
 * @description : Hashes the password of a user
 *
 * @param {*} user : Object containing the user whose password needs to be hashed
 * @returns : The user object with the hashed password
 */
const hashPassword = async (user, options) => {
  // If the password is not defined, return the object as it is
  if (!user.password) {
    return user;
  }

  // Number of rounds to generate the salt
  const saltRounds = 10;
  // Generate the salt
  const salt = await bcrypt.genSalt(saltRounds);
  // Hash the password with the salt
  user.password = await bcrypt.hash(user.password, salt);

  return user;
};

// Model hooks for User
User.addHook("beforeCreate", hashPassword);
User.addHook(
  "beforeBulkCreate",
  async (users, options) =>
    await Promise.all(users.map((e) => hashPassword(e, options)))
);

/**
 * @description : Validates if the provided password matches the user's password
 *
 * @param {string} password : Password to validate
 * @returns {Promise<boolean>} : Returns a promise that resolves to a boolean
 *  indicating whether the password matches the user's password or not
 */
User.prototype.validatePassword = async function (password) {
  const user = User.build({ password: this.password });
  return await bcrypt.compare(password, user.password);
};

/**
 * @description : Removes the password field from the user object before sending it
 */
User.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

export default User;
