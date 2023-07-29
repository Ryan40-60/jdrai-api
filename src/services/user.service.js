import dbService from "./db.service.js";

import User from "../database/models/user.model.js";
import ApiError from "../class/ApiError.js";
import httpStatus from "http-status";

/**
 * @description Retrieves a list of all users from the database.
 *
 * @returns {Promise<[User[] | null, Error | null]>} An array containing the list of users and an error (if any).
 *                                                  The user array will be null if there was an error fetching the users.
 *                                                  The error will be null if the operation was successful.
 */
const listUsers = async () => {
  try {
    // Fetch all users from the database
    const users = await dbService.findAll(User);
    return [users, null];
  } catch (error) {
    // Error occurred during the database operation
    return [null, error];
  }
};

/**
 * @description Retrieves a user from the database by its ID.
 *
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<[User | null, ApiError | null]>} An array containing the user object and an error (if any).
 *                                                  The user will be null if the user with the given ID was not found.
 *                                                  The error will be null if the operation was successful.
 *                                                  If the user is not found, an ApiError with a 404 status and a "User not found" message will be thrown.
 */
const getUserById = async (userId) => {
  try {
    // Retrieve the user from the database by its ID
    const user = await dbService.findByPk(User, userId);

    // If the user is not found, throw an ApiError
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return [user, null];
  } catch (error) {
    // Error occurred during the database operation or user not found
    return [null, error];
  }
};

export default {
  getUserById,
  listUsers,
};
