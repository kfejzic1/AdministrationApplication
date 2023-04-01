import axios from 'axios';
import { env } from '../config/env';

export function getUser(data) {
	return axios(env.API_ENV.url + '/api/User/getuser', {
		method: 'GET',
		params: {
            UserName: data.UserName
        },
		headers: {
			'Content-Type': 'application/json'
		}
	});
}