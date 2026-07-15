import { env } from '../config/env.js';

export const refreshCookieOptions = {
  httpOnly: true,
  secure: env.cookieSecure,
  sameSite: env.cookieSameSite,
  maxAge: 7 * 24 * 60 * 60 * 1000
};
