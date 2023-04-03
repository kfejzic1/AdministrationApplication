import axios from 'axios';
import { env } from '../config/env';

export function Create(request) {
	return axios(env.API_ENV.url + '/api/Vendor/POS/Create', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getAllById(locationId) {
	return axios(env.API_ENV.url + '/api/Vendor/POS/'+locationId, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function Update(request) {
	return axios(env.API_ENV.url + '/api/Vendor/POS/Update', {
		method: 'PUT',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function Delete(request) {
	return axios(env.API_ENV.url + '/api/Vendor/POS/Delete', {
		method: 'DELETE',
        data:request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

