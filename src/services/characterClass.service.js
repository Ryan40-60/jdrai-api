import httpStatus from "http-status";

import dbService from "./db.service.js";
import ApiError from "../class/ApiError.js";

import CharacterClass from "../database/models/characterClass.model.js";

/**
 * @description Retrieves character class information by its ID.
 *
 * @param {Object} character - The character object to which the class information will be added.
 * @returns {Promise<[CharacterClass | null, Error | null]>} An array containing the character class object and an error (if any).
 *                                                           The character class will be null if the given ID was not found.
 *                                                           The error will be null if the operation was successful.
 */
const getCharacterClass = async (characterClassId) => {
  try {
    // Fetch the character class from the database
    const characterClass = await dbService.findByPk(
      CharacterClass,
      characterClassId
    );

    // If the character class is not found, throw an ApiError
    if (!characterClass) {
      throw new ApiError(httpStatus.NOT_FOUND, "Character class not found");
    }

    // Return the character class object
    return [characterClass, null];
  } catch (characterClassError) {
    return [null, characterClassError];
  }
};

export default {
  getCharacterClass,
};
