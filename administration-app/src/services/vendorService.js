import axios from 'axios';
import { env } from '../config/env';

export function createVendor(request) {
	return axios(env.API_ENV.url + '/api/Vendor', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getAllVendors() {
	return axios(env.API_ENV.url + '/api/Vendor', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
