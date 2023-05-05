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

export function getAllVouchers() {
	console.log("Da li se poziva ova funkcija");
	return axios(env.API_ENV.testUrl + '/api/Voucher/get-vouchers', {
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
	console.log("Data ovdje " + JSON.stringify(data));
	return axios(env.API_ENV.testUrl + '/api/Voucher/create-voucher', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function changeVoucherStatus(data) {
	console.log("data unutar funkcije " + JSON.stringify(data));
	return axios(env.API_ENV.testUrl + '/api/Voucher/change-voucher-status', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}