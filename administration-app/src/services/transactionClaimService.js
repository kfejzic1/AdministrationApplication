import axios from 'axios';
import { env } from '../config/env';

export function getUserClaims() {
	return axios(env.API_ENV.testUrl + '/api/transactions/user/claims', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}