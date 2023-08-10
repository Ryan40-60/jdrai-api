import httpStatus from "http-status";

import dbService from "./db.service.js";
import ApiError from "../class/ApiError.js";

import User from "../database/models/user.model.js";

/**
 * @description: Checks if the provided username is available.
 *
 * @param {string} username - The username to check for availability.
 * @returns {boolean} - Returns true if the username is available, false otherwise.
 */
const isUsernameAvailable = async (username) => {
  const user = await dbService.findOne(User, { username: username });
  return !user;
};

/**
 * @description: Checks if the provided email is available.
 *
 * @param {string} email - The email to check for availability.
 * @returns {boolean} - Returns true if the email is available, false otherwise.
 */
const isEmailAvailable = async (email) => {
  const user = await dbService.findOne(User, { email: email });
  return !user;
};

/**
 * @description: Registers a new user with the provided username, email, and password.
 *
 * @param {string} username - The username of the new user.
 * @param {string} email - The email of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Promise<[User | null, Error | null]>} Returns an array containing the newly registered user and an error (if any).
 *                                                   The user will be null if there was an error during registration.
 *                                                   The error will be null if registration was successful.
 */
const register = async (username, email, password) => {
  const data = { username, email, password };
  try {
    // Create a new user in the database with the provided data
    const user = await dbService.create(User, data);
    return [user, null];
  } catch (error) {
    // Error occurred during user registration
    return [null, error];
  }
};

/**
 * @description: Authenticates a user with the provided username or email informations.
 *
 * @param {string} usernameOrEmail - Either the username or the email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<[User | null, Error | null]>} Returns an array containing the authenticated user and an error (if any).
 *                                                        The user will be null if authentication fails.
 *                                                        The error will be null if authentication is successful.
 */
const login = async (usernameOrEmail, password) => {
  try {
    // Find user by username and password
    let user = await dbService.findOne(User, {
      username: usernameOrEmail,
    });

    // If user not found, find user by email and password
    if (!user) {
      user = await dbService.findOne(User, {
        email: usernameOrEmail,
      });
    }

    // If user still not found, throw an error
    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Informations de connexion incorrectes"
      );
    }

    // If provided password doesn't match the user's actual password, throw an error
    const isPasswordCorrect = await user.validatePassword(password);
    if (!isPasswordCorrect) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Informations de connexion incorrectes"
      );
    }

    return [user, null];
  } catch (error) {
    // Error occurred during authentication
    return [null, error];
  }
};

export default {
  isUsernameAvailable,
  isEmailAvailable,
  register,
  login,
};
