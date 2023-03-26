import axios from 'axios';
import { env } from '../config/env';

export function getAllUsers() {
	return axios(env.API_ENV.url + '/api/User', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token'),
		},
	});
}
