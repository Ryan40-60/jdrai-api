/**
 * @description: Joi validation for UUID
 *
 * @param {string} value - The value to validate as a UUID.
 * @param {object} helpers - Joi helpers object to provide error messages.
 * @returns {string} - The validated UUID value or an error message.
 */
export const validateUUID = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F-]{36}$/)) {
    return helpers.message("Invalid UUID format.");
  }
  return value;
};
