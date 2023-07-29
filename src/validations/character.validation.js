import Joi from "joi";

/**
 * @description: Joi Schemas for character-related requests.
 */

/**
 * @description: Schema for the "createCharacter" request
 */
const createCharacter = {
  body: Joi.object().keys({
    characterClassId: Joi.number().integer().required(),
    name: Joi.string().required(),
  }),
};

const characterValidation = { createCharacter };

export default characterValidation;
