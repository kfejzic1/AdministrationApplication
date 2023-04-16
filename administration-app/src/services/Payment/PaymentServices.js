import axios from 'axios';
import { env } from '../../config/env';

export function sendPaymentInfoAccount(info) {
	console.log('Pristupilo se servisu slanja za RACUN:', JSON.stringify(info));
	return axios(env.ANDROID_API_ENV.url + '/api/Transaction/CreateTransaction?token=' + localStorage.getItem('token'), {
		method: 'POST',
		data: info,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}


export function sendPaymentInfoPhone(info) {
	console.log('Pristupilo se servisu slanja za TELEFON:', JSON.stringify(info));
	return axios(env.ANDROID_API_ENV.url + '/api/Transaction/CreateTransactionRecipientPhone?token=' + localStorage.getItem('token'), {
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