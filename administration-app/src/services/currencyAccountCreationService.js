import axios from 'axios';
import { env } from '../config/env';

export function getAllRequests() {
	return axios(env.API_ENV.url + '/api/Account/requests', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function approveRequest(id) {
	return axios(env.API_ENV.url + '/api/Account/approve?id=' + id, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
