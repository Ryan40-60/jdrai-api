/**
 * @description: Global utility functions for the application
 * This section contains various useful functions used in the API.
 */

/*****************
 *     GLOBALS   *
 *****************/

/**
 * @description: Creates an object that is a subset of the object passed as a parameter
 *
 * @param {Object} object - The original object
 * @param {string[]} keys - The keys to include in the subset
 * @returns {Object} - The subset of the original object
 */
export const createSubset = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (key in object) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
