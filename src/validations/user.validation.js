import Joi from "joi";

/**
 * @description: Joi Schemas for user-related requests.
 */

/**
 * @description: Schema for the "getUser" request
 */
const getUser = {
  params: Joi.object().keys({
    id: Joi.string().uuid(),
  }),
};

/**
 * @description: Schema for the "updateAuthenticatedUser" request
 */
const updateAuthenticatedUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

/**
 * @description: Schema for the "updateUser" request
 */
const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().uuid(),
  }),
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

/**
 * @description: Schema for the "deleteUser" request
 */
const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().uuid(),
  }),
};

const userValidation = {
  getUser,
  updateAuthenticatedUser,
  updateUser,
  deleteUser,
};

export default userValidation;
