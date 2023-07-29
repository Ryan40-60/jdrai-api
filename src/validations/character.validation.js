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

/**
 * @description: Schema for the "getCharacter" request
 */
const getCharacter = {
  params: Joi.object().keys({
    id: Joi.string().uuid(),
  }),
};

/**
 * @description: Schema for the "updateCharacter" request
 */
const updateCharacter = {
  params: Joi.object().keys({
    id: Joi.string().uuid(),
  }),
  body: Joi.object().keys({
    characterClassId: Joi.number().integer().required(),
    name: Joi.string().required(),
  }),
};

/**
 * @description: Schema for the "deleteCharacter" request
 */
const deleteCharacter = {
  params: Joi.object().keys({
    id: Joi.string().uuid(),
  }),
};

const characterValidation = {
  createCharacter,
  getCharacter,
  updateCharacter,
  deleteCharacter,
};

export default characterValidation;
