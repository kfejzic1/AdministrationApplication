export function specifyData(id, data) {
	console.log('dl====', data, JSON.stringify(data));
	return 0;
	return axios(env.API_ENV.url + '/api/AdminEInvoice/' + id + '/e-invoices/create', {
		method: 'POST',
		body: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
export function approve(id, data) {
	return axios(env.API_ENV.url + '/api/AdminEInvoice/' + id + '/e-invoices/approve?approve=' + data, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function getRequests() {
	return axios(env.API_ENV.url + '/api/AdminEInvoice/b2b/e-invoices/requests', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
