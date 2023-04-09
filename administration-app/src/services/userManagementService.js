import axios from 'axios';
import { env } from '../config/env';

export function createUser(request) {
	return axios(env.API_ENV.url + '/api/User/create', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function setUserPassword(request) {
	return axios(env.API_ENV.url + '/api/Customer/setCustomerPassword', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export function resetUserPassword(request) {
	return axios(env.API_ENV.url + '/api/Customer/resetCustomerPassword', {
		method: 'PATCH',
		data: request,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export function getAllUsers() {
	return axios(env.API_ENV.url + '/api/User/allWithRoles', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function findCustomerById(id) {
	return axios(env.API_ENV.url + `/api/Customer/getCustomer/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function editUser(editUserRequest) {
	return axios(env.API_ENV.url + '/api/User/edit', {
		method: 'PATCH',
		data: editUserRequest,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function requestPasswordReset(id) {
	return axios(env.API_ENV.url + '/api/Customer/forgotCustomerPassword', {
		method: 'POST',
		data: id,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
