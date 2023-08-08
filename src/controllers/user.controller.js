import httpStatus from "http-status";

import ApiError from "../class/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import dbService from "../services/db.service.js";
import userService from "../services/user.service.js";
import authService from "../services/auth.service.js";
import tokenService from "../services/token.service.js";

import User from "../database/models/user.model.js";

/**
 * @description: Controller function for listing all users.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const listUsers = catchAsync(async (req, res) => {
  // Attempt to retrieve the list of users
  const [users, userError] = await userService.listUsers();

  // If there was an error during fetch, throw the error
  if (userError) {
    throw userError;
  }

  // Send the user data in the response
  res.send(users);
});

/**
 * @description: Controller function for retrieving authenticated user information.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const getAuthenticatedUser = catchAsync(async (req, res) => {
  // Retrieve the user's ID from the request
  const { id: userId } = req.user;

  // Attempt to retrieve the user
  const [user, userError] = await userService.getUserById(userId);

  // If there was an error during fetch, throw the error
  if (userError) {
    throw userError;
  }

  // Send the user data in the response
  res.send(user);
});

/**
 * @description: Controller function for retrieving user information by its ID.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const getUser = catchAsync(async (req, res) => {
  // Retrieve the user's ID from the request
  const { id: userId } = req.params;

  // Attempt to retrieve the user
  const [user, userError] = await userService.getUserById(userId);

  // If there was an error during fetch, throw the error
  if (userError) {
    throw userError;
  }

  // Send the user data in the response
  res.send(user);
});

/**
 * @description: Controller function for updating the authenticated user.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const updateAuthenticatedUser = catchAsync(async (req, res) => {
  // Extract the necessary data from the request
  const { username, email, password } = req.body;
  const user = req.user;

  // Check if the provided username is available
  if (user.username !== username) {
    const usernameAvailable = await authService.isUsernameAvailable(username);
    if (!usernameAvailable) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "Nom d'utilisateur non disponible"
      );
    }
  }

  // Check if the provided email is available
  if (user.email !== email) {
    const emailAvailable = await authService.isEmailAvailable(email);
    if (!emailAvailable) {
      throw new ApiError(httpStatus.CONFLICT, "Cet email est déjà utilisé");
    }
  }

  // Attempt to update the user
  const [updatedUser, userError2] = await userService.updateUser(
    user.id,
    username,
    email,
    password
  );

  // If there was an error during update, throw the error
  if (userError2) {
    throw userError2;
  }

  // Send the user data in the response
  res.send(updatedUser);
});

/**
 * @description: Controller function for updating user by its ID.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const updateUser = catchAsync(async (req, res) => {
  // Extract the necessary data from the request
  const { username, email, password } = req.body;
  const { id: userId } = req.params;

  // Attempt to retrieve the user
  const [user, userError] = await userService.getUserById(userId);

  // If there was an error during fetch, throw the error
  if (userError) {
    throw userError;
  }

  // Check if the provided username is available
  if (user.username !== username) {
    const usernameAvailable = await authService.isUsernameAvailable(username);
    if (!usernameAvailable) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "Nom d'utilisateur non disponible"
      );
    }
  }

  // Check if the provided email is available
  if (user.email !== email) {
    const emailAvailable = await authService.isEmailAvailable(email);
    if (!emailAvailable) {
      throw new ApiError(httpStatus.CONFLICT, "Cet email est déjà utilisé");
    }
  }

  // Attempt to update the user
  const [updatedUser, userError2] = await userService.updateUser(
    userId,
    username,
    email,
    password
  );

  // If there was an error during update, throw the error
  if (userError2) {
    throw userError2;
  }

  // Send the user data in the response
  res.send(updatedUser);
});

/**
 * @description: Controller function for deleting authenticated user.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const deleteAuthenticatedUser = catchAsync(async (req, res) => {
  // Retrieve the user's ID from the request
  const { id: userId } = req.user;

  // Delete the user
  await dbService.deleteByPk(User, userId);

  // Delete the deleted user's authentication tokens from the database
  await tokenService.deleteRefreshToken(userId);

  // Send a response indicating success
  res.send({ message: "User deleted successfully" });
});

/**
 * @description: Controller function for deleting user by its ID.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const deleteUser = catchAsync(async (req, res) => {
  // Retrieve the user's ID from the request
  const { id: userId } = req.params;

  // Attempt to retrieve the user
  const [user, userError] = await userService.getUserById(userId);

  // If there was an error during fetch, throw the error
  if (userError) {
    throw userError;
  }

  // Delete the user
  await dbService.deleteByPk(User, userId);

  // Delete the deleted user's authentication tokens from the database
  await tokenService.deleteRefreshToken(userId);

  // Send a response indicating success
  res.send({ message: "User deleted successfully" });
});
