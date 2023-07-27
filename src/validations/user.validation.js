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

const userValidation = { getUser };

export default userValidation;
