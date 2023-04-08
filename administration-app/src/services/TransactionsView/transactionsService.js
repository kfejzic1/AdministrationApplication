import axios from 'axios';
import { env } from '../../config/env';
import { useNavigate } from 'react-router-dom';
import { transactions } from './mock';
export function getBasicTransactions(number = 10) {
	return number < transactions.length
		? { data: transactions.slice(0, number), hasMore: true }
		: { data: transactions, hasMore: false };
}
export function getTransactions(pageNumber, pageSize, sortingOptions, mock) {
	console.log('Sorting optins=', JSON.stringify(sortingOptions));
	var mockSortingOptons = JSON.parse(JSON.stringify(sortingOptions));
	if (sortingOptions != null) {
		if (sortingOptions.MinAmount === '') {
			delete sortingOptions.MinAmount;
		}
		if (sortingOptions.SortingOptions === '') {
			delete sortingOptions.SortingOptions;
		}

		if (sortingOptions.Recipient === '') delete sortingOptions.Recipient;
		if (sortingOptions.DateTimeEnd === '') delete sortingOptions.DateTimeEnd;
		else if (sortingOptions.DateTimeEnd)
			sortingOptions.DateTimeEnd = JSON.stringify(sortingOptions.DateTimeEnd).replaceAll('"', '');
		if (sortingOptions.DateTimeStart === '') delete sortingOptions.DateTimeStart;
		else if (sortingOptions.DateTimeStart)
			sortingOptions.DateTime = JSON.stringify(sortingOptions.DateTimeStart).replaceAll('"', '');
		if (sortingOptions.Ascending === '') delete sortingOptions.Ascending;
		if (sortingOptions.Status === '') delete sortingOptions.Status;
		if (sortingOptions.MaxAmount === '') delete sortingOptions.MaxAmount;
	}
	return new Promise(function (resolveO, reject) {
		if (!mock)
			axios(env.API_ENV.url + '/api/transactions?pageNumber=' + pageNumber + '&pageSize=' + pageSize, {
				method: 'GET',
				params: sortingOptions,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
				.then(function (response) {
					resolveO(response);
				})
				.catch(function (err) {
					//if (err.response.status === 401)
					//	navigate('/login');
					console.log('mockup');
					sortingOptions = mockSortingOptons;
					var temp = transactions.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
					if (sortingOptions != null) {
						if (sortingOptions.Recipient && sortingOptions.Recipient != '') {
							temp = temp.filter(transaction7 => transaction7.recipient.includes(sortingOptions.Recipient));
						}
						console.log('temp=', sortingOptions.Recipient, pageNumber, pageSize, JSON.stringify(temp));

						if (sortingOptions.Status && sortingOptions.Status != '') {
							temp = temp.filter(transaction => transaction.status == sortingOptions.Status);
						}

						if (sortingOptions.MinAmount && sortingOptions.MinAmount != '') {
							temp = temp.filter(transaction => transaction.amount > parseInt(sortingOptions.MinAmount));
						}
						if (sortingOptions.MaxAmount && sortingOptions.MaxAmount != '') {
							temp = temp.filter(transaction => transaction.amount < parseInt(sortingOptions.MaxAmount));
						}

						if (sortingOptions.DateTimeStart && sortingOptions.DateTimeStart.length > 14) {
							temp = temp.filter(
								transaction => new Date(transaction.dateTime) > new Date(sortingOptions.DateTimeStart)
							);
						}
						if (sortingOptions.DateTimeEnd && sortingOptions.DateTimeEnd.length > 14) {
							temp = temp.filter(transaction => new Date(transaction.dateTime) < new Date(sortingOptions.DateTimeEnd));
						}

						if (sortingOptions.SortingOptions && sortingOptions.SortingOptions != '') {
							if (sortingOptions.SortingOptions == 'DateTime')
								temp = temp.sort((a, b) => {
									if (new Date(a.dateTime) - new Date(b.dateTime) > 0) {
										if (sortingOptions.Ascending) return 1;
										else return -1;
									} else {
										if (!sortingOptions.Ascending) return 1;
										else return -1;
									}
								});
							if (sortingOptions.SortingOptions == 'Status') {
								temp = temp.sort((a, b) => {
									if (a.status.localeCompare(b.status) > 0) {
										if (sortingOptions.Ascending) return 1;
										else return -1;
									} else {
										if (!sortingOptions.Ascending) return 1;
										else return -1;
									}
								});
							}
							if (sortingOptions.SortingOptions == 'Amount') {
								temp = temp.sort((a, b) => {
									if (a.amount - b.amount > 0) {
										if (sortingOptions.Ascending) return 1;
										else return -1;
									} else {
										if (!sortingOptions.Ascending) return 1;
										else return -1;
									}
								});
							}
							if (sortingOptions.SortingOptions == 'Recipient') {
								temp = temp.sort((a, b) => {
									if (a.recipient.localeCompare(b.recipient) > 0) {
										if (sortingOptions.Ascending) return 1;
										else return -1;
									} else {
										if (!sortingOptions.Ascending) return 1;
										else return -1;
									}
								});
							}
						}
					}
					resolveO({ data: temp });
				});
		else {
			sortingOptions = mockSortingOptons;
			var temp = transactions.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
			if (sortingOptions != null) {
				if (sortingOptions.Recipient && sortingOptions.Recipient != '') {
					temp = temp.filter(transaction7 => transaction7.recipient.includes(sortingOptions.Recipient));
				}
				console.log('temp=', sortingOptions.Recipient, pageNumber, pageSize, JSON.stringify(temp));

				if (sortingOptions.Status && sortingOptions.Status != '') {
					temp = temp.filter(transaction => transaction.status == sortingOptions.Status);
				}

				if (sortingOptions.MinAmount && sortingOptions.MinAmount != '') {
					temp = temp.filter(transaction => transaction.amount > parseInt(sortingOptions.MinAmount));
				}
				if (sortingOptions.MaxAmount && sortingOptions.MaxAmount != '') {
					temp = temp.filter(transaction => transaction.amount < parseInt(sortingOptions.MaxAmount));
				}

				if (sortingOptions.DateTimeStart && sortingOptions.DateTimeStart.length > 14) {
					temp = temp.filter(transaction => new Date(transaction.dateTime) > new Date(sortingOptions.DateTimeStart));
				}
				if (sortingOptions.DateTimeEnd && sortingOptions.DateTimeEnd.length > 14) {
					temp = temp.filter(transaction => new Date(transaction.dateTime) < new Date(sortingOptions.DateTimeEnd));
				}

				if (sortingOptions.SortingOptions && sortingOptions.SortingOptions != '') {
					if (sortingOptions.SortingOptions == 'DateTime')
						temp = temp.sort((a, b) => {
							if (new Date(a.dateTime) - new Date(b.dateTime) > 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
					if (sortingOptions.SortingOptions == 'Status') {
						temp = temp.sort((a, b) => {
							if (a.status.localeCompare(b.status) > 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
					}
					if (sortingOptions.SortingOptions == 'Amount') {
						temp = temp.sort((a, b) => {
							if (a.amount - b.amount > 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
					}
					if (sortingOptions.SortingOptions == 'Recipient') {
						temp = temp.sort((a, b) => {
							if (a.recipient.localeCompare(b.recipient) > 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
					}
				}
			}
			resolveO({ data: temp });
		}
	});
}
export function getMaxAmount(mock) {
	return new Promise(function (resolveO, reject) {
		if (!mock)
			axios(env.API_ENV.url + '/api/transactions', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
				.then(function (response) {
					resolveO(
						response.data.reduce((max, item) => {
							return item.amount > max ? item.amount : max;
						}, 0)
					);
				})
				.catch(function (err) {
					//	if (err.response.status === 401) navigate('/login');
					resolveO(
						transactions.reduce((max, item) => {
							return item.amount > max ? item.amount : max;
						}, 0)
					);
				});
		else
			resolveO(
				transactions.reduce((max, item) => {
					return item.amount > max ? item.amount : max;
				}, 0)
			);
	});
	/*
return axios(env.API_ENV.url + '/api/transactions?pageNumber=' + pageNumber + '&pageSize=' + pageSize, {
		method: 'GET',
		params: sortingOptions,
		headers: {
			'Content-Type': 'application/json',
		},
	});
*/
}

export function getTransactionDetails(id, mock) {
	return new Promise((resolve, reject) => {
		if (!mock)
			axios(env.API_ENV.url + '/api/transactions/' + id, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			})
				.then(function (response) {
					resolve(response);
				})
				.catch(function (response) {
					//if (err.response.status === 401) navigate('/login');
					resolve({ data: transactions.filter(a => a.id == id)[0] });
				});
		else resolve({ data: transactions.filter(a => a.id == id)[0] });
	});
	/*
	return axios(env.API_ENV.url + '/api/transactions/' + id, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	*/
}
export function parseDate(date) {
	const inputDate = new Date(date);

	var hours = inputDate.getHours().toString();
	if (hours == '0') hours = '00';
	const minutes = inputDate.getMinutes().toString().padStart(2, '0');
	const seconds = inputDate.getSeconds().toString().padStart(2, '0');
	const day = inputDate.getDate().toString().padStart(2, '0');
	const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
	const year = inputDate.getFullYear().toString();

	const outputDateStr = `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;

	return outputDateStr;
}
function formatDateForDb(inputDate) {
	// Split the input date string into its date and time components
	const [time, date] = inputDate.split(' ');

	// Split the date component into day, month, and year
	const [day, month, year] = date.split('.');

	// Create a new date object with the components in the correct order
	const newDate = new Date(`${year}-${month}-${day}T${time}`);

	// Format the new date object into the desired output format
	const isoDate = newDate.toISOString();

	// Return the formatted date string
	return isoDate;
}
