import axios from 'axios';
import { env } from '../config/env';

export function getAllExchangeRates() {
	return axios(env.API_ENV.url + '/api/exchangerate', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}


export function createExchangeRate(request) {
	return axios(env.API_ENV.url + '/api/exchangerate', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getAllCurrencies() {
	return axios(env.API_ENV.url + '/api/exchangerate/currency', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function createCurrency(request) {
	return axios(env.API_ENV.url + '/api/exchangerate/currency', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}