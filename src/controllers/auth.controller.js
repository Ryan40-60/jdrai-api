import httpStatus from "http-status";

import ApiError from "../class/ApiError.js";

import catchAsync from "../utils/catchAsync.js";

import authService from "../services/auth.service.js";
import tokenService from "../services/token.service.js";
import dbService from "../services/db.service.js";

import Token from "../database/models/token.model.js";

/**
 * @description: Controller function for user registration.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
const register = catchAsync(async (req, res) => {
  // Extract the necessary data from the request body
  const { username, mail, password } = req.body;

  // Check if the provided username is available
  const usernameAvailable = await authService.isUsernameAvailable(username);
  if (!usernameAvailable) {
    throw new ApiError(httpStatus.CONFLICT, `Username already taken`);
  }

  // Check if the provided email is available
  const mailAvailable = await authService.isMailAvailable(mail);
  if (!mailAvailable) {
    throw new ApiError(httpStatus.CONFLICT, `Email already taken`);
  }

  // Attempt to register the user using the authentication service
  const [user, userError] = await authService.register(
    username,
    mail,
    password
  );

  // If there was an error during registration, throw the error
  if (userError) {
    throw userError;
  }

  // Generate authentication tokens for the authenticated user using the token service
  const [tokens, tokenError] = await tokenService.generateAuthTokens(user);

  // If there was an error during tokens generation, throw the error
  if (tokenError) {
    throw tokenError;
  }

  user.dataValues.tokens = tokens;

  // Send the user data in the response
  res.send(user);
});

/**
 * @description: Controller function for user login.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
const login = catchAsync(async (req, res) => {
  // Extract the necessary data from the request body
  const { log: usernameOrEmail, password } = req.body;

  // Neither username nor email provided in the request
  if (!usernameOrEmail || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Log information missing from the request"
    );
  }

  // Attempt login using the provided log information
  const [user, userError] = await authService.login(usernameOrEmail, password);

  // If there was an error during login, throw the error
  if (userError) {
    throw userError;
  }

  // Generate authentication tokens for the authenticated user using the token service
  const [tokens, tokenError] = await tokenService.generateAuthTokens(user);

  // If there was an error during tokens generation, throw the error
  if (tokenError) {
    throw tokenError;
  }

  user.dataValues.tokens = tokens;

  // Send the user data in the response
  res.send(user);
});

/**
 * @description : Controller function for user logout. Deletes the user's refresh token from the database.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
const logout = catchAsync(async (req, res) => {
  // Retrieve the user's ID from the request
  const userId = req.user.id;

  // Delete the user's authentication tokens from the database
  await dbService.destroy(Token, { id_user: userId });

  // Send a response indicating successful logout
  res.send({ message: "Logout successful" });
});

const authController = { register, login, logout };
export default authController;
