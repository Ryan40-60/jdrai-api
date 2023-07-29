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
    mail: Joi.string().email().required(),
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
    mail: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const userValidation = { getUser, updateAuthenticatedUser, updateUser };

export default userValidation;
