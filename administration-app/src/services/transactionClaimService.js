import axios from 'axios';
import { env } from '../config/env';

export function getUserClaims() {
	return axios(env.API_ENV.url + '/api/transactions/user/claims', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getUserClaim(claimId) {
	return axios(env.API_ENV.url + '/api/transactions/claim/' + claimId, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function createClaimMessage(request) {
	return axios(env.API_ENV.url + '/api/transactions/claim/message', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
