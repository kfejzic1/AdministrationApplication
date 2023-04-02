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

export function login(data) {
	return axios(env.API_ENV.url + '/api/User/login', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export function twoFactorAuthentication(data) {
	return axios(env.API_ENV.url + '/api/User/login2FA', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export function getTwoFactorQRCode(id) {
	return axios(env.API_ENV.url + '/api/User/2fa-qrcode', {
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

export function toggle2FA(id) {
	return axios(env.API_ENV.url + '/api/User/2fa-toggle', {
		method: 'PATCH',
		params: {
			id,
		},
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
