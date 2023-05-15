import axios from 'axios';
import { env } from '../config/env';

export function getAllInvoices() {
    return [{id: 1, 
    PayerName: 'Kemal', 
    PayerAccountNumber: '1234', 
    PayerAddress: 'Adresa', 
    Reference: '0001', 
    PayeeName: 'Bingo', 
    PayeeAccountNumber: '2345', 
    PayeeAddress: 'Adresa 2', 
    Amount: 100, 
    CurrencyId: 7, 
    Currency: 'BAM'}];
	// return axios(env.API_ENV.url + '/api/EInvoice/listEInvoices', {
	// 	method: 'GET',
	// 	headers: {
	// 		Authorization: 'Bearer ' + localStorage.getItem('token'),
	// 		'Content-Type': 'application/json',
	// 	},
	// });
}