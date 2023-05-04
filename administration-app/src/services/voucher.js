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
	return axios('http://localhost:5051/api/Voucher/get-vouchers', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function createVoucher() {
	return axios(env.API_ENV.testUrl + '/api/Voucher/create-voucher', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function changeVoucherStatus() {
	return axios(env.API_ENV.testUrl + '/api/Voucher/change-voucher-status', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}