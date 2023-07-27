import dbService from "./db.service.js";

import User from "../database/models/user.model.js";
import ApiError from "../class/ApiError.js";
import httpStatus from "http-status";

/**
 * @description:
 *
 * @param {string} userId -
 * @returns {Array} - Returns an array containing the list of users and an error (if any).
 *                    The user will be null if there was an error during registration.
 *                    The error will be null if registration was successful.
 */
const listUsers = async () => {
  try {
    const users = await dbService.findAll(User);
    return [users, null];
  } catch (error) {
    // Error occurred during
    return [null, error];
  }
};

/**
 * @description:
 *
 * @param {string} userId -
 * @returns {Array} - Returns an array containing the newly registered user and an error (if any).
 *                    The user will be null if there was an error during registration.
 *                    The error will be null if registration was successful.
 */
const getUserById = async (userId) => {
  try {
    const user = await dbService.findByPk(User, userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return [user, null];
  } catch (error) {
    // Error occurred during
    return [null, error];
  }
};

export default {
  getUserById,
  listUsers,
};
