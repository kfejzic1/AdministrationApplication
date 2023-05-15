import axios from 'axios';
import { env } from '../config/env';



export function getAllCurrencies() {
	return axios(env.API_ENV.url + '/api/exchangerate/currency', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getAllVouchers() {
	return axios(env.API_ENV.url + '/api/Voucher/get-vouchers', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function createVoucher(no, am, cu) {
	var data = {

		"noVouchers": no, 
		"amount": am,
		"currencyId": cu
	
	}
	return axios(env.API_ENV.url + '/api/Voucher/create-voucher', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function changeVoucherStatus(data) {
	return axios(env.API_ENV.url + '/api/Voucher/change-voucher-status', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}