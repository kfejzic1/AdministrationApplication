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

export function createExchangeTransaction(request) {
	return axios(env.API_ENV.url + "/api/exchange/createexchangetransaction", {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getAccounts(){
	return axios('http://siprojekat.duckdns.org:5051/api/Exchange/GetUserAccounts', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer '+localStorage.getItem('token'),
		},
	});
}

export function getUserAccounts(){
	return axios(env.API_ENV.url + "/api/exchange/getuseraccounts", {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}


export function getAllAcounts(){
	return axios(env.API_ENV.url + '/api/exchange/getallaccounts', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getUserTransactions(){
	return axios('https://processingserver.herokuapp.com/api/Transaction/GetTransactionsForUser?token=' + localStorage.getItem('token'), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}


export function redeemVoucher(request) {
	return axios(env.API_ENV.url + '/api/VoucherRedemption/RedeemVoucher', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}