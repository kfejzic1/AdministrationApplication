import axios from 'axios';
import { env } from '../config/env';

export function deleteDocument(id) {
	return axios(env.API_ENV.url + '/api/Document/' + id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function uploadDocument(data) {
	return axios(env.API_ENV.url + '/api/Document/UploadDocument', {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: 'Bearer ' + localStorage.getItem('token')
		},
		data: data
	});
}
