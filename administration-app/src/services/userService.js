import axios from 'axios';
import { env } from '../config/env';
import jwtDecode from 'jwt-decode';

export function getAllUsers() {
	return axios(env.API_ENV.url + '/api/User', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getUserName() {
	const decoded = jwtDecode(localStorage.getItem('token'));
	return decoded.Name;
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
