import { env } from "../config/env";
import axios from 'axios';

export function requiredData(data) {
    //console.log("Poslao sam " + data + " a data je " + typeof data);  
    return axios(env.API_ENV.url + '/api/InvoiceRegistration/required-data?B2BName=' + data, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
}

export function registrationRequest(data) {
    return axios(env.API_ENV.url + '/api/InvoiceRegistration/registration-request', {
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
}