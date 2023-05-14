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

export function getAssignedClaims() {
	return axios(env.API_ENV.url + '/api/transactions/admin/claims', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function assignClaim(data) {
	return axios(env.API_ENV.url + '/api/transactions/admin/claim/accept', {
		method: 'PUT',
		data: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function updateClaim(data) {
	return axios(env.API_ENV.url + '/api/transactions/admin/claim/update', {
		method: 'PUT',
		data: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getMessages(id) {
	return axios(env.API_ENV.url + '/api/transactions/claim/' + id, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function sendMessage(data) {
	return axios(env.API_ENV.url + '/api/transactions/claim/message', {
		method: 'POST',
		data: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
