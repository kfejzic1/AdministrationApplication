import axios from 'axios';
import { env } from '../../config/env';

export function sendPaymentInfo(info) {
	return axios(env.ANDROID_API_ENV.url + '/Transaction/CreateTransaction?token=' + 'TEST', {
		method: 'POST',
		data: info,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
