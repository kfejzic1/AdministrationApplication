import axios from 'axios';
import { env } from '../config/env';

export function getUser(id) {
	return axios(env.API_ENV.url + '/api/User', {
		method: 'GET',
		params: {
			id,
		},
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
