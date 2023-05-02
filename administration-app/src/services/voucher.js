import axios from 'axios';
import { env } from '../config/env';



export function getAllCurrencies() {
	return axios(env.API_ENV.testUrl + '/api/exchangerate/currency', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}