import axios from 'axios';
import { env } from '../config/env';

export function getAllUserInvoices() {
	return axios(env.API_ENV.url + '/api/Einvoice/listEInvoices', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
