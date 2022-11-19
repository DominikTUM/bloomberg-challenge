import config from '../configuration.json';
import axios from 'axios';

/**
 * Log in user.
 * @param {string} email name of the user.
 * @param {string} password password of th users.
 * @return {Promise<string>} jwt
 */
export async function login(email: string, password: string) {
  return await axios.post(`${config.BACKEND_URL}/auth`, {email, password});
}

/**
 * Register in user.
 * @param {string} email email of the user.
 * @param {string} password password of the users.
 * @param {string} name name of the users.
 * @return {Promise<Response>} raw response of register service
 */
export async function register(
    email: string,
    password: string,
    name: string,
) {
  return await axios.post(`${config.BACKEND_URL}/register`,
      {email, password, name});
}

