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
	return axios('https://processingserver.herokuapp.com/api/Transaction/CreateTransaction?token=' + localStorage.getItem('token'), {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getUserAccounts(){
	return axios('https://processingserver.herokuapp.com/api/Account/GetAllAccountsForUser?token=' + localStorage.getItem('token'), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getAllAcounts(){
	return axios('https://processingserver.herokuapp.com/api/Account/GetAllAccounts?token=' + localStorage.getItem('token'), {
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