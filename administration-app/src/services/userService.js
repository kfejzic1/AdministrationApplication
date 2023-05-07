import axios from 'axios';
import { env } from '../config/env';
import jwtDecode from 'jwt-decode';

export function getAllUsers() {
	return axios(env.API_ENV.url + '/api/User/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getUser() {
	return axios(env.API_ENV.url + '/api/User', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getUserId() {
	const decoded = jwtDecode(localStorage.getItem('token'));
	return decoded.UserId;
}

export function getUserByName(username) {
	return axios(env.API_ENV.url + '/api/User/' + username, {
		method: 'GET',
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

export function logout() {
	return axios(env.API_ENV.url + '/api/User/logout', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function google(data) {
	return axios.post(env.API_ENV.url + '/api/User/login/google?token=' + data, {});
}

export function facebook(data) {
	return axios.post(env.API_ENV.url + '/api/User/login/facebook?token=' + data, {});
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

export function getTwoFactorQRCode() {
	return axios(env.API_ENV.url + '/api/User/2fa-qrcode', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function toggle2FA() {
	return axios(env.API_ENV.url + '/api/User/2fa-toggle', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getAllAccounts(id) {
	return axios(env.API_ENV.url + '/api/Account/user-accounts', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function createAccountCreationRequest(data) {
	return axios(env.API_ENV.url + '/api/Account/user-account-create', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}


export function getValidateToken(data) {
	return axios(env.API_ENV.url + '/api/User/validate-token?token=' + data, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}