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
    strength: Joi.number().integer().required(),
    agility: Joi.number().integer().required(),
    charisma: Joi.number().integer().required(),
    luck: Joi.number().integer().required(),
  }),
};

/**
 * @description: Schema for the "getCharacter" request
 */
const getCharacter = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

/**
 * @description: Schema for the "updateCharacter" request
 */
const updateCharacter = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    characterClassId: Joi.number().integer().required(),
    name: Joi.string().required(),
    strength: Joi.number().integer().required(),
    agility: Joi.number().integer().required(),
    charisma: Joi.number().integer().required(),
    luck: Joi.number().integer().required(),
  }),
};

/**
 * @description: Schema for the "deleteCharacter" request
 */
const deleteCharacter = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const characterValidation = {
  createCharacter,
  getCharacter,
  updateCharacter,
  deleteCharacter,
};

export default characterValidation;
