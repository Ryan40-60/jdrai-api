import Joi from "joi";

/**
 * @description: Joi Schemas for character class-related requests.
 */

/**
 * @description: Schema for the "getCharacterClass" request
 */
const getCharacterClass = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const characterClassValidation = {
  getCharacterClass,
};

export default characterClassValidation;
