import dbService from "./db.service.js";
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
 * @param {string} mail - The email to check for availability.
 * @returns {boolean} - Returns true if the email is available, false otherwise.
 */
const isMailAvailable = async (mail) => {
  const user = await dbService.findOne(User, { mail: mail });
  return !user;
};

/**
 * @description: Registers a new user with the provided username, email, and password.
 *
 * @param {string} username - The username of the new user.
 * @param {string} mail - The email of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Array} - Returns an array containing the newly registered user and an error (if any).
 *                    The user will be null if there was an error during registration.
 *                    The error will be null if registration was successful.
 */
const register = async (username, mail, password) => {
  const data = { username, mail, password };
  try {
    const user = await dbService.create(User, data);
    return [user, null];
  } catch (error) {
    return [null, error];
  }
};

export default { isUsernameAvailable, isMailAvailable, register };
