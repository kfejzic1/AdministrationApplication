import axios from 'axios';
import { env } from '../config/env';

export function login(data) {
	return axios(env.SERVER_ENV.url + '/api/User/login', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Origin': '*',
		},
	});
}

export function twoFactorAuthentication(data) {
	return axios(env.SERVER_ENV.url + '/api/User/login2FA', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Origin': '*',
		},
	});
}
