import httpStatus from "http-status";
import ApiError from "../class/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import authService from "../services/auth.service.js";

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
  const [user, error] = await authService.register(username, mail, password);

  // If there was an error during registration, throw an internal server error
  if (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }

  // If registration is successful, send the user data in the response
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

  // Attempt login using the provided username
  const [user, error] = await authService.login(usernameOrEmail, password);

  // If there was an error during login, throw an internal server error
  if (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }

  // Send the user data in the response
  res.send(user);
});

const authController = { register, login };
export default authController;
