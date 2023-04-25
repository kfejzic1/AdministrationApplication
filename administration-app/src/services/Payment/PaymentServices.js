import axios from 'axios';
import { env } from '../../config/env';

export function getCurrencys() {
	return axios(env.API_ENV.url + '/api/ExchangeRate/currency', {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json',
		},
	});
}
export function getAccounts() {
	return axios(env.API_ENV.url + '/api/Transaction/CreateTransaction?token=', {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token'),
			'Content-Type': 'application/json',
		},
	});
}
export function sendPaymentInfoAccount(info) {
	return axios(env.ANDROID_API_ENV.url + '/api/Transaction/CreateTransaction?token=' + localStorage.getItem('token'), {
		method: 'POST',
		data: info,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
/* 

headers: {
	'Content-Type': 'application/json',
	Authorization: 'Bearer ' + localStorage.getItem('token'),
},

*/
