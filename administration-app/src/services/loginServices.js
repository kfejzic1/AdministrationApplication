import axios from 'axios';
import { env } from '../config/env';

export function loginFunction(email, password) {
    const url = `${env.API_ENV.url}/login`;
    const data = { email, password };

    return axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
}
