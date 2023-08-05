import catchAsync from "../utils/catchAsync.js";

import dbService from "../services/db.service.js";
import characterClassService from "../services/characterClass.service.js";

import CharacterClass from "../database/models/characterClass.model.js";

/**
 * @description Controller function for listing all character classes.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const listCharacterClasses = catchAsync(async (req, res) => {
  // Retrieves the list of character classes
  const characterClasses = await dbService.findAll(CharacterClass);

  // Send the character classes data in the response
  res.send(characterClasses);
});

/**
 * @description Controller function for retrieving a character class.
 *
 * @param {Object} req - Object representing the request sent to the server.
 * @param {Object} res - Object representing the response to be sent to the client.
 */
export const getCharacterClass = catchAsync(async (req, res) => {
  // Extract the character class ID from the request parameters
  const { id: characterClassId } = req.params;

  // Attempt to retrieve the character class
  const [characterClass, characterClassError] =
    await characterClassService.getCharacterClass(characterClassId);

  // If there was an error during fetch, throw the error
  if (characterClassError) {
    throw characterClassError;
  }

  // Send the character class data in the response
  res.send(characterClass);
});
