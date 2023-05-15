import axios from 'axios';
import { env } from '../config/env';

export function getAllClaims() {
	return axios(env.API_ENV.url + '/api/User/allAdmin', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function acceptClaim(claim) {
	return axios(env.API_ENV.url + '/api/User/allAdmin', {
		method: 'PATCH',
		data: claim,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function sloveClaim(claim) {
	return axios(env.API_ENV.url + '/api/User/allAdmin', {
		method: 'PATCH',
		data: claim,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
export function addClaimMessage(request) {
	return axios(env.API_ENV.url + '/api/transactions/claim/message', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
export function getDocumentById(docId) {
	return axios(env.API_ENV.url + '/api/transactions/documents/' + docId, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}