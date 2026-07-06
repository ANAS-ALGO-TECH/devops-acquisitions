// Constants
import { ENVIRONMENTS } from '#constants/enums.js';

export const cookies = {
  getOptions: () => ({
    secure: process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION,
    maxAge: 15 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict'
  }),
  set: (res, name, value, options = {}) => {
    res.cookie(name, value, { ...cookies.getOptions(), ...options });
  },
  get: (req, name) => {
    return req.cookies[name];
  },
  clear: (res, name, options = {}) => {
    res.clearCookie(name, { ...cookies.getOptions(), ...options });
  }
};