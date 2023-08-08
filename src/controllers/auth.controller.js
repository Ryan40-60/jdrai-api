import httpStatus from "http-status";

import ApiError from "../class/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import dbService from "../services/db.service.js";
import authService from "../services/auth.service.js";
import userService from "../services/user.service.js";
import tokenService from "../services/token.service.js";

import Token from "../database/models/token.model.js";

/**
 * @description: Controller function for user registration.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const register = catchAsync(async (req, res) => {
  // Extract the necessary data from the request
  const { username, email, password } = req.body;

  // Check if the provided username is available
  const usernameAvailable = await authService.isUsernameAvailable(username);
  if (!usernameAvailable) {
    throw new ApiError(httpStatus.CONFLICT, "Nom d'utilisateur non disponible");
  }

  // Check if the provided email is available
  const emailAvailable = await authService.isEmailAvailable(email);
  if (!emailAvailable) {
    throw new ApiError(httpStatus.CONFLICT, "Cet email est déjà utilisé");
  }

  // Attempt to register the user
  const [user, userError] = await authService.register(
    username,
    email,
    password
  );

  // If there was an error during registration, throw the error
  if (userError) {
    throw userError;
  }

  // Attempt to generate authentication tokens for the registered user
  const [tokens, tokenError] = await tokenService.generateAuthTokens(user);

  // If there was an error during tokens generation, throw the error
  if (tokenError) {
    throw tokenError;
  }

  // Send the user data and the tokens in the response
  res.send({ user, ...tokens });
});

/**
 * @description: Controller function for user login.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const login = catchAsync(async (req, res) => {
  // Extract the necessary data from the request
  const { log: usernameOrEmail, password } = req.body;

  // Check if username/email and password are provided in the request
  if (!usernameOrEmail || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Information de connexion manquante"
    );
  }

  // Attempt login using the provided logs information
  const [user, userError] = await authService.login(usernameOrEmail, password);

  // If there was an error during login, throw the error
  if (userError) {
    throw userError;
  }

  // Attempt to generate authentication tokens for the authenticated user
  const [tokens, tokenError] = await tokenService.generateAuthTokens(user);

  // If there was an error during tokens generation, throw the error
  if (tokenError) {
    throw tokenError;
  }

  // Send the user data and the tokens in the response
  res.send({ user, ...tokens });
});

/**
 * @description : Controller function for user logout.
 *                Deletes the user's refresh token from the database.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const logout = catchAsync(async (req, res) => {
  // Retrieve the user's ID from the request
  const userId = req.user.id;

  // Delete the user's authentication tokens from the database
  await dbService.destroy(Token, { id_user: userId });

  // Send a response indicating successful logout
  res.send({ message: "Logout successful" });
});

/**
 * @description Controller function for refreshing authentication tokens using a refresh token.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const refreshTokens = catchAsync(async (req, res) => {
  // Retrieve the refresh token from the request
  const { refreshToken } = req.body;

  // Attempt to verify the provided refresh token
  const [token, tokenError] = await tokenService.verifyToken(refreshToken);

  // If there was an error during tokens verification, throw the error
  if (tokenError) {
    throw tokenError;
  }

  // Attempt to retrieve the user associated with the refresh token
  const [user, userError] = await userService.getUserById(token.id_user);

  // If there was an error during fetch, throw the error
  if (userError) {
    throw userError;
  }

  // Delete the used refresh token from the database to prevent reuse
  await tokenService.deleteRefreshToken(user.id);

  // Attempt to generate new authentication tokens for the authenticated user
  const [tokens, tokenError2] = await tokenService.generateAuthTokens(user);

  // If there was an error during tokens generation, throw the error
  if (tokenError2) {
    throw tokenError2;
  }

  // Send the new tokens in the response
  res.send({ ...tokens });
});
