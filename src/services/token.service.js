import jwt from "jsonwebtoken";
import moment from "moment";
import httpStatus from "http-status";

import ApiError from "../class/ApiError.js";
import envConfig from "../config/env.config.js";
import { tokens } from "../config/enum.config.js";
import dbService from "./db.service.js";

import Token from "../database/models/token.model.js";

/**
 * @description : Generates a Json Web Token (JWT) based on the user ID.
 *
 * @param {String} userId - The ID of the user generating the token
 * @param {Date} expires - Expiration date of the token
 * @param {String} secret - JWT secret (optional)
 * @returns {String} - The encrypted token
 */
const generateToken = (userId, expires, secret = envConfig.jwt.secret) => {
  // The payload is used to generate a unique token
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };

  return jwt.sign(payload, secret);
};

/**
 * @description : Deletes the refreshToken associated with the user ID when logging in.
 *
 * @param {String} userId - The ID of the user logging in
 */
const deleteRefreshToken = async (userId) => {
  // Check if a refresh token is assigned to the user
  const tokenUser = await dbService.findOne(Token, {
    id_user: userId,
    type: tokens.REFRESH,
  });

  // If a token is found, delete it
  if (tokenUser) {
    await dbService.destroy(Token, { token: tokenUser.token });
  }
};

/**
 * @description Decrypts the JWT and retrieves the corresponding Token from the database.
 *
 * @param {String} token - The JWT to decrypt and verify.
 * @returns {Promise<[Token | null, Error | null]>} - An array containing the verified Token object and an error (if any).
 *                                                  The Token object will be null if there was an error verifying the JWT.
 *                                                  The error will be null if the operation was successful.
 */
const verifyToken = async (token) => {
  try {
    // Decrypt the provided token to retrieve the payload it contains
    const payload = jwt.verify(token, envConfig.jwt.secret);

    // Retrieve the token from the database based on the token and user ID from the JWT payload
    const foundToken = await dbService.findOne(Token, {
      token: token,
      id_user: payload.sub,
    });

    // If the token is not found, throw an ApiError
    if (!foundToken) {
      throw new ApiError(httpStatus.NOT_FOUND, "Token non trouvé");
    }

    return [foundToken, null];
  } catch (error) {
    // Error occurred during JWT verification or database operation
    return [null, error];
  }
};

/**
 * @description Generates two authentication tokens for the provided user.
 *
 * @param {Object} user - The user found in the database.
 * @returns {Promise<[Object | null, Error | null]>} - An array containing an object with access and refresh tokens, and an error (if any).
 *                                                     The tokens object will be null if there was an error generating the tokens.
 *                                                     The error will be null if the operation was successful.
 */
const generateAuthTokens = async (user) => {
  try {
    // Create an accessToken with its expiration date
    const accessTokenExpires = moment().add(
      envConfig.jwt.accessExpirationMinutes,
      "minutes"
    );
    const accessToken = generateToken(user.id, accessTokenExpires);

    // Create a refreshToken with its expiration date
    const refreshTokenExpires = moment().add(
      envConfig.jwt.refreshExpirationDays,
      "days"
    );
    const refreshToken = generateToken(user.id, refreshTokenExpires);

    // Delete the refreshToken associated with the user if it exists
    await deleteRefreshToken(user.id);

    // Save the refreshToken in the database
    await dbService.create(Token, {
      token: refreshToken,
      id_user: user.id,
      type: tokens.REFRESH,
      expires: refreshTokenExpires,
      blacklisted: false,
    });

    // Return the generated tokens in an object along with null error
    return [
      {
        access: {
          token: accessToken,
          expires: accessTokenExpires.toDate(),
        },
        refresh: {
          token: refreshToken,
          expires: refreshTokenExpires.toDate(),
        },
      },
      null,
    ];
  } catch (error) {
    // Return null tokens and the error in case of failure
    return [null, error];
  }
};

const tokenService = {
  verifyToken,
  generateAuthTokens,
  deleteRefreshToken,
};

export default tokenService;
