import axios from 'axios';
import { env } from '../config/env';

export function createVendor(request) {
	return axios(env.API_ENV.url + '/api/Vendor', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getVendor(id) {
	return axios(env.API_ENV.url + '/api/Vendor/' + id, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getAllVendors() {
	return axios(env.API_ENV.url + '/api/Vendor', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getVendorLocation(locationID) {
	return axios(env.API_ENV.url + '/api/Vendor/Location/' + locationID, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getAllVendorLocations(vendorID) {
	return axios(env.API_ENV.url + '/api/Vendor/Locations/' + vendorID, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getInvoiceFrequencies() {
	return axios(env.API_ENV.url + '/api/Vendor/InvoiceFrequency', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function deleteVendorLocation(request) {
	return axios(env.API_ENV.url + '/api/Vendor/Location/Delete', {
		method: 'DELETE',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function createVendorLocation(request) {
	return axios(env.API_ENV.url + '/api/Vendor/Location/Create', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function editVendorLocation(request) {
	return axios(env.API_ENV.url + '/api/Vendor/Location/Update', {
		method: 'PUT',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function deleteVendor(request) {
	return axios(env.API_ENV.url + '/api/Vendor/Delete', {
		method: 'DELETE',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function createPaymentTerm(request) {
	return axios(env.API_ENV.url + '/api/Vendor/PaymentTerm/Create', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export async function uploadFile(file, folder, vendorName) {
	let data = new FormData();
	data.append('file', file, file.name);
	data.append('Folder', folder);
	data.append('NodeName', vendorName);

	return axios.post(env.API_ENV.url + '/api/Document/UploadDocument', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getAllPaymentTerms(vendorId) {
	return axios(env.API_ENV.url + '/api/Vendor/PaymentTerm/' + vendorId, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function updatePaymentTerm(request) {
	return axios(env.API_ENV.url + '/api/Vendor/PaymentTerm/Update', {
		method: 'PUT',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function deletePaymentType(id) {
	return axios(env.API_ENV.url + '/api/Vendor/PaymentTerm/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
