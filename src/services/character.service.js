import httpStatus from "http-status";

import dbService from "./db.service.js";
import ApiError from "../class/ApiError.js";

import Character from "../database/models/character.model.js";
import CharacterClass from "../database/models/characterClass.model.js";

/**
 * @description Create a character with the provided information.
 *
 * @param {string} userId - The ID of the authenticated user.
 * @param {string} characterClassId - The ID of the character class for the character.
 * @param {string} name - The name of the character.
 * @returns {Promise<[Character | null, Error | null]>} An array containing the created character and an error (if any).
 *                                                      The character will be null if there was an error creating the character.
 *                                                      The error will be null if the operation was successful.
 */
const createCharacter = async (userId, characterClassId, name) => {
  // Prepare the data for creating a character
  const data = {
    id_user: userId,
    id_characterClass: characterClassId,
    name: name,
  };

  try {
    // Check if the provided character class exists in the database
    const characterClass = await dbService.findByPk(
      CharacterClass,
      characterClassId
    );
    if (!characterClass) {
      throw new ApiError(httpStatus.NOT_FOUND, "Character class not found");
    }

    // Create the character in the database
    const character = await dbService.create(Character, data);

    // Attach the character class data to the character
    character.dataValues.class = characterClass;

    return [character, null];
  } catch (error) {
    // Error occurred during the database operation
    return [null, error];
  }
};

/**
 * @description Retrieves a list of all characters associated with the authenticated user.
 *
 * @param {string} userId - The ID of the authenticated user.
 * @returns {Promise<[Array<Character> | null, Error | null]>} An array containing the list of characters and an error (if any).
 *                                                      The characters array will be null if there was an error fetching the characters.
 *                                                      The error will be null if the operation was successful.
 */
const listCharacters = async (userId) => {
  try {
    // Fetch all characters associated with the authenticated user from the database
    let characters = await dbService.findAll(Character, { id_user: userId });

    // Add character class information to each character using the addCharacterClass function
    characters = await Promise.all(
      characters.map((character) => addCharacterClass(character))
    );

    return [characters, null];
  } catch (error) {
    // Error occurred during the database operation
    return [null, error];
  }
};

/**
 * @description Adds character class information to the given character object.
 *
 * @param {Object} character - The character object to which the class information will be added.
 * @returns {Object} - The character object with the class information added.
 */
const addCharacterClass = async (character) => {
  // Fetch the character class from the database using the character's class ID
  const characterClass = await dbService.findByPk(
    CharacterClass,
    character.id_characterClass
  );

  // If the character class is not found, throw an ApiError with 404 status and a "Character class not found" message
  if (!characterClass) {
    throw new ApiError(httpStatus.NOT_FOUND, "Character class not found");
  }

  // Add the character class information to the character object
  character.dataValues.class = characterClass;

  // Return the character object with the class information added
  return character;
};

export default {
  createCharacter,
  listCharacters,
};
