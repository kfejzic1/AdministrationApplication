import axios from 'axios';
import { env } from '../config/env';

export function loginFunction(email, password) {

    const url = `${env.API_ENV.url}/api/User/login`;
    const data = { email, password };
    

    return axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'
        },
      });
}


export function twoFactorAut(code, email){
  const url = `${env.API_ENV.url}/api/User/login2FA`;
  const data = {code, email}
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*'
    },
  });
}
