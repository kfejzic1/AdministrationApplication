import axios from 'axios';
import { env } from '../config/env';

export function getAllInvoices() {
    return [{id: 1, 
    PayerName: 'Matija Kokor', 
    PayerAccountNumber: '1234', 
    PayerAddress: 'ADRESA', 
    Reference: 'REFERENCE', 
    PayeeName: 'Test Company', 
    PayeeAccountNumber: '8hae7i1', 
    PayeeAddress: 'ADDRESS', 
    Description: 'Bill Payment',
    Amount: 37, 
    CurrencyId: 7, 
    Currency: {Name:'bam'}}];
	// return axios(env.API_ENV.url + '/api/EInvoice/listEInvoices', {
	// 	method: 'GET',
	// 	headers: {
	// 		Authorization: 'Bearer ' + localStorage.getItem('token'),
	// 		'Content-Type': 'application/json',
	// 	},
	// });
}

export function setPaidInvoice(id){
    return axios(env.API_ENV.url + '/api/EInvoice/payEinvoice/' + id, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function createEInvoiceTransaction(request){
    return axios('https://processingserver.herokuapp.com/api/EInvoicePayment/ExecuteInvoicePayment?token='+localStorage.getItem('token'),{
        method: 'POST',
        data: request,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}