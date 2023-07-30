import Joi from "joi";

/**
 * @description: Joi Schemas for authentication-related requests.
 */

/**
 * @description: Schema for the "register" request
 */
const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    mail: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

/**
 * @description: Schema for the "login" request
 */
const login = {
  body: Joi.object().keys({
    log: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

/**
 * @description: Schema for the "refreshTokens" request
 */
const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const authValidation = { register, login, refreshTokens };

export default authValidation;
