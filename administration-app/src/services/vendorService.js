import axios from 'axios';
import { env } from '../config/env';

export function createVendor(request) {
	return axios(env.API_ENV.url + '/api/Vendor', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		}
	});
}

export function getVendor(id){
	return axios(env.API_ENV.url + '/api/Vendor/' + id, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		}
	});
}

export function getAllVendors() {
	return axios(env.API_ENV.url + '/api/Vendor', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		}
	});
}

export function getVendorLocation(locationID){
	return axios(env.API_ENV.url + '/api/Vendor/Location/' + locationID, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		}
	});
}

export function getAllVendorLocations(vendorID) {
	return axios(env.API_ENV.url + '/api/Vendor/Locations/' + vendorID, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		}
	});
}

export function deleteVendorLocation(request) {
	return axios(env.API_ENV.url + '/api/Vendor/Location/Delete', {
		method: 'DELETE',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		}
	});
}

export function createVendorLocation(request) {
	return axios(env.API_ENV.url + '/api/Vendor/Location/Create', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		}
	});
}

export function editVendorLocation(request){
	return axios(env.API_ENV.url + '/api/Vendor/Location/Update', {
		method: 'PUT',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		}
	});
}

export function deleteVendor(request){
	return axios(env.API_ENV.url + '/api/Vendor/Delete', {
		method: 'DELETE',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		}
	});
}
