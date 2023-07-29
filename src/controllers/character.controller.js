import catchAsync from "../utils/catchAsync.js";

import characterService from "../services/character.service.js";
import httpStatus from "http-status";

/**
 * @description: Controller function for creating a character.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const createCharacter = catchAsync(async (req, res) => {
  // Extract the necessary data from the request
  const { characterClassId, name } = req.body;
  const { id: userId } = req.user;

  // Attempt to create a character attached to the authenticated user
  const [character, characterError] = await characterService.createCharacter(
    userId,
    characterClassId,
    name
  );

  // If there was an error during create, throw the error
  if (characterError) {
    throw characterError;
  }

  // Send the character data in the response
  res.send(character);
});

/**
 * @description Controller function for retrieving a character.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const getCharacter = catchAsync(async (req, res) => {
  // Extract the character's ID from the request parameters
  const { id: characterId } = req.params;

  // Attempt to retrieve the character associated with the authenticated user
  const [character, characterError] = await characterService.getCharacter(
    characterId
  );

  // If there was an error during the fetch, throw the error
  if (characterError) {
    throw characterError;
  }

  // Send the character data in the response
  res.send(character);
});

/**
 * @description Controller function for listing all characters associated with the authenticated user.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const listCharacters = catchAsync(async (req, res) => {
  // Extract the authenticated user's ID from the request
  const { id: userId } = req.user;

  // Attempt to retrieve the list of characters associated with the authenticated user
  const [characters, characterError] = await characterService.listCharacters(
    userId
  );

  // If there was an error during the fetch, throw the error
  if (characterError) {
    throw characterError;
  }

  // Send the characters data in the response
  res.send(characters);
});

/**
 * @description Controller function for updating a character.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const updateCharacter = catchAsync(async (req, res) => {
  // Extract the necessary data from the request
  const { characterClassId, name } = req.body;
  const { id: characterId } = req.params;
  const { id: userId } = req.user;

  // Attempt to update the character attached to the authenticated user
  const [updatedCharacter, characterError] =
    await characterService.updateCharacter(
      userId,
      characterId,
      characterClassId,
      name
    );

  // If there was an error during the update, throw the error
  if (characterError) {
    throw characterError;
  }

  // Send the updated character data in the response
  res.send(updatedCharacter);
});

/**
 * @description Controller function for deleting a character.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const deleteCharacter = catchAsync(async (req, res) => {
  // Extract the necessary data from the request
  const { id: characterId } = req.params;
  const { id: userId } = req.user;

  // Attempt to delete the character associated with the authenticated user
  await characterService.deleteCharacter(userId, characterId);

  // Send a response indicating success
  res.send({ message: "Character deleted successfully" });
});
