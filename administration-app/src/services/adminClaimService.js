import axios from 'axios';
import { env } from '../config/env';

export function getAllOpenClaims() {
	return axios(env.API_ENV.url + '/api/transactions/admin/claims/open', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
