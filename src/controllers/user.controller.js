import catchAsync from "../utils/catchAsync.js";
import userService from "../services/user.service.js";

/**
 * @description: Controller function for listing all users.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
const listUsers = catchAsync(async (req, res) => {
  // Attempt to retrieve the list of users
  const [users, userError] = await userService.listUsers();

  // If there was an error during fetching, throw the error
  if (userError) {
    throw userError;
  }

  // Send the user data in the response
  res.send(users);
});

/**
 * @description: Controller function for retrieving user information by ID.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
const getUser = catchAsync(async (req, res) => {
  // Extract the necessary data from the request
  const { id: userId } = req.params;

  // Attempt to retrieve the user
  const [user, userError] = await userService.getUserById(userId);

  // If there was an error during fetching, throw the error
  if (userError) {
    throw userError;
  }

  // Send the user data in the response
  res.send(user);
});

/**
 * @description: Controller function for retrieving authenticated user information.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
const getAuthenticatedUser = catchAsync(async (req, res) => {
  // Extract the necessary data from the request
  const { id: userId } = req.user;

  // Attempt to retrieve the user
  const [user, userError] = await userService.getUserById(userId);

  // If there was an error during fetching, throw the error
  if (userError) {
    throw userError;
  }

  // Send the user data in the response
  res.send(user);
});

const userController = { getUser, listUsers, getAuthenticatedUser };
export default userController;
