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
 * @description Retrieves a character from the database by its ID and adds character class information to it.
 *
 * @param {string} characterId - The ID of the character to retrieve.
 * @returns {Promise<[Character | null, Error | null]>} An array containing the character object and an error (if any).
 *                                                      The character will be null if the character with the given ID was not found.
 *                                                      The error will be null if the operation was successful.
 */
const getCharacter = async (characterId) => {
  try {
    // Fetch the character from the database using the character ID
    let character = await dbService.findByPk(Character, characterId);

    // Add character class information to the character using the addCharacterClass function
    character = await addCharacterClass(character);

    // Return the character object with the class information added
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
 * @description Update a character with the provided information.
 *
 * @param {string} userId - The ID of the authenticated user.
 * @param {string} characterId - The ID of the character to update.
 * @param {string} characterClassId - The ID of the character class for the character.
 * @param {string} name - The name of the character.
 * @returns {Promise<[Character | null, Error | null]>} An array containing the updated character and an error (if any).
 *                                                      The character will be null if there was an error updating the character.
 *                                                      The error will be null if the operation was successful.
 */
const updateCharacter = async (userId, characterId, characterClassId, name) => {
  // Prepare the data for updating a character
  const data = {
    id_characterClass: characterClassId,
    name: name,
  };

  try {
    // Check if the authenticated user owns the character
    await verifyBelonging(userId, characterId);

    // Update the character in the database
    let [updatedCharacter] = await dbService.update(
      Character,
      { id: characterId },
      data
    );

    // Add character class information to the updated character using the addCharacterClass function
    updatedCharacter = await addCharacterClass(updatedCharacter);

    return [updatedCharacter, null];
  } catch (error) {
    // Error occurred during the database operation
    return [null, error];
  }
};

/**
 * @description Deletes a character with the provided information.
 *
 * @param {string} userId - The ID of the authenticated user.
 * @param {string} characterId - The ID of the character to be deleted.
 * @returns {Promise<[null, Error | null]>} A promise that resolves with null and an error (if any).
 *                                         The promise will resolve with null if the deletion is successful.
 *                                         The error will be null if the operation was successful.
 */
const deleteCharacter = async (userId, characterId) => {
  // Check if the authenticated user owns the character
  await verifyBelonging(userId, characterId);

  // Delete the character from the database
  await dbService.deleteByPk(Character, characterId);

  return;
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

  // If the character class is not found, throw an ApiError
  if (!characterClass) {
    throw new ApiError(httpStatus.NOT_FOUND, "Character class not found");
  }

  // Add the character class information to the character object
  character.dataValues.class = characterClass;

  // Return the character object with the class information added
  return character;
};

/**
 * @description Verifies if the authenticated user owns the given character.
 *
 * @param {string} userId - The ID of the authenticated user.
 * @param {string} characterId - The ID of the character to be verified.
 * @returns {Object} - The character object with the class information added.
 */
const verifyBelonging = async (userId, characterId) => {
  // Check if the character exists in the database
  const character = await dbService.findByPk(Character, characterId);

  // If the character is not found, throw an ApiError
  if (!character) {
    throw new ApiError(httpStatus.NOT_FOUND, "Character not found");
  }

  // Check if the authenticated user owns the character
  if (userId !== character.id_user) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
  }

  return;
};

export default {
  createCharacter,
  listCharacters,
  getCharacter,
  updateCharacter,
  deleteCharacter,
};
