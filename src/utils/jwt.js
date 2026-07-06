// Dependencies
import jwt from 'jsonwebtoken';

// Constants
import { ERRORS } from '#constants/errors.js';

// Config
import logger from '#config/logger.js';

export const jwtToken = {
  sign: (payload) => {
    try {
      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    } catch (error) {
      logger.error(ERRORS.JWT_TOKEN_SIGN_ERROR, error);
      throw new Error(ERRORS.JWT_TOKEN_SIGN_ERROR, error);
    }
  },
  verify: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      logger.error(ERRORS.FAILED_TO_AUTHENTICATE_TOKEN, error);
      throw new Error(ERRORS.FAILED_TO_AUTHENTICATE_TOKEN, error);
    }
  }
};