import axios from 'axios';
import { env } from '../../config/env';
export function specifyData(id, data) {
	return axios(env.API_ENV.url + '/api/AdminEInvoice/' + id + '/e-invoices/create', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
export function approve(id, data) {
	return axios(env.API_ENV.url + '/api/AdminEInvoice/' + id + '/e-invoices/approve?approve=' + data, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getRequests() {
	/*
	return new Promise((resolve, reject) => {
		resolve({
			data: [
				{ user: { userName: 'adfa' }, vendor: { name: 'sdfsd' } },
				{ user: { userName: 'adfa' }, vendor: { name: 'sdfsd' } },
			],
		});
	});
	*/
	return axios(env.API_ENV.url + '/api/AdminEInvoice/b2b/e-invoices/requests', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
