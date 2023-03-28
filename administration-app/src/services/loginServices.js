import axios from 'axios';
import { env } from '../config/env';

function checkData(input) {
  const regex = new RegExp('^[0-9]+$');
  if (input.length <= 10 && input.match(regex))
      return "phone";
  else 
      return "email";
}


export function loginFunction(email, password) {
  const url = `${env.API_ENV.url}/api/User/login`;
    if(checkData(email) === "email"){
      const data = { email, password };
      

      return axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*'
          },
        });
    }else{
      const phone = email;
      const data = { phone, password };
      return axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*'
        },
      });
    }
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
