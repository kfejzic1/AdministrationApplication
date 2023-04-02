import axios from 'axios';
import { env } from '../../config/env';

export function sendPaymentInfo(info) {
	return axios(env.ANDROID_API_ENV.url + '/Transaction/CreateTransaction?token=' + 'TEST', {
		method: 'POST',
		data: info,
		crossorigin: true,
		mode: 'cors',
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
			'Access-Control-Allow-Headers': '*',
		},
	});
}
