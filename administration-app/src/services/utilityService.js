import axios from 'axios';
import { encode, decode } from 'base-64';
import { env } from '../config/env';

export function sendNotification(message) {
	return axios('https://onesignal.com/api/v1/notifications', {
		method: 'POST',
		data: JSON.stringify({
			app_id: env.NOTIFICATION_API.app,
			included_segments: ['Subscribed Users'],
			data: { foo: 'bar' },
			contents: { en: message },
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + decode(env.NOTIFICATION_API.key),
		},
	});
}
