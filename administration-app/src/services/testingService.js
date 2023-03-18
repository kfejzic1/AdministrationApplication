import axios from 'axios';
import { env } from '../config/env';

export function testFunction() {
	return axios(env.API_ENV.url + '/WeatherForecast', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
