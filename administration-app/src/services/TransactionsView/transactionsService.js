import axios from 'axios';
import { env } from '../../config/env';
import { transactions } from './mock';
export function getBasicTransactions(number = 10) {
	return number < transactions.length
		? { data: transactions.slice(0, number), hasMore: true }
		: { data: transactions, hasMore: false };
}
export function getTransactions(pageNumber, pageSize, sortingOptions, mock) {
	//console.log('Sorting optins=', JSON.stringify(sortingOptions));
	var mockSortingOptons = JSON.parse(JSON.stringify(sortingOptions));
	if (sortingOptions != null) {
		if (sortingOptions.AmountStartFilter === '') {
			delete sortingOptions.AmountStartFilter;
		}
		if (sortingOptions.sortingOrder === '') {
			delete sortingOptions.sortingOrder;
		}

		if (sortingOptions.RecipientNameFilter === '') delete sortingOptions.RecipientNameFilter;
		if (sortingOptions.CreatedAtEndFilter === '' || sortingOptions.CreatedAtEndFilter === null)
			delete sortingOptions.CreatedAtEndFilter;
		else if (sortingOptions.CreatedAtEndFilter)
			sortingOptions.CreatedAtEndFilter = JSON.stringify(sortingOptions.CreatedAtEndFilter).replaceAll('"', '');
		if (sortingOptions.CreatedAtStartFilter === '' || sortingOptions.CreatedAtStartFilter === null)
			delete sortingOptions.CreatedAtStartFilter;
		else if (sortingOptions.CreatedAtStartFilter)
			sortingOptions.CreatedAtStartFilter = JSON.stringify(sortingOptions.CreatedAtStartFilter).replaceAll('"', '');
		if (sortingOptions.TransactionTypeFilter === '') delete sortingOptions.TransactionTypeFilter;
		if (sortingOptions.AmountEndFilter === '') delete sortingOptions.AmountEndFilter;
		if (sortingOptions.CurrencyFilter === '') delete sortingOptions.CurrencyFilter;
	}
	return new Promise(function (resolveO, reject) {
		console.log('treba da zoem');
		if (!mock)
			axios(
				env.ANDROID_API_ENV.url +
					'/api/Transaction/GetTransactionsForUser?token=' +
					localStorage.getItem('token') +
					'&pageNumber=' +
					pageNumber +
					'&pageSize=' +
					pageSize,
				{
					method: 'GET',
					params: sortingOptions,
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				}
			)
				.then(function (response) {
					console.log('ne vraca nista');
					resolveO(response);
				})
				.catch(function (err) {
					console.log('erorrrrrrrr');
					if (err.response.status == 401) reject(401);
				});
		else {
			console.log('dada ', JSON.stringify(sortingOptions));
			if (
				sortingOptions.sortingOrder.slice(sortingOptions.sortingOrder.length - 3, sortingOptions.sortingOrder.length) ==
				'asc'
			) {
				sortingOptions.Ascending = true;
				sortingOptions.SortingColumn = sortingOptions.sortingOrder.slice(0, sortingOptions.sortingOrder.length - 3);
			} else {
				sortingOptions.Ascending = false;
				sortingOptions.SortingColumn = sortingOptions.sortingOrder.slice(0, sortingOptions.sortingOrder.length - 4);
			}
			console.log(sortingOptions.SortingColumn, 'dafdafdfdasf');
			var temp = transactions.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
			if (sortingOptions != null) {
				if (sortingOptions.RecipientNameFilter && sortingOptions.RecipientNameFilter != '') {
					temp = temp.filter(transaction7 => transaction7.recipient.name?.includes(sortingOptions.RecipientNameFilter));
				}
				//console.log('temp=', sortingOptions.RecipientNameFilter, pageNumber, pageSize, JSON.stringify(temp));

				if (sortingOptions.Status && sortingOptions.Status != '') {
					var temp2 = transactions.filter(tr => tr.currency === sortingOptions.Status);
					temp = temp2.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
				}

				if (sortingOptions.TransactionTypeFilter && sortingOptions.TransactionTypeFilter != '') {
					temp = temp.filter(transaction => transaction.TransactionTypeFilter == sortingOptions.TransactionTypeFilter);
				}

				/*if (sortingOptions.Currency && sortingOptions.Currency != '') {
							temp = temp.filter(transaction => transaction.currency == sortingOptions.Currency);
						}*/

				if (sortingOptions.AmountStartFilter && sortingOptions.AmountStartFilter != '') {
					temp = temp.filter(transaction => transaction.amount > parseInt(sortingOptions.AmountStartFilter));
				}
				if (sortingOptions.AmountEndFilter && sortingOptions.AmountEndFilter != '') {
					temp = temp.filter(transaction => transaction.amount < parseInt(sortingOptions.AmountEndFilter));
				}

				if (sortingOptions.CreatedAtStartFilter && sortingOptions.CreatedAtStartFilter.length > 14) {
					temp = temp.filter(
						transaction => new Date(transaction.createdAt) > new Date(sortingOptions.CreatedAtStartFilter)
					);
				}
				if (sortingOptions.CreatedAtEndFilter && sortingOptions.CreatedAtEndFilter.length > 14) {
					temp = temp.filter(
						transaction => new Date(transaction.createdAt) < new Date(sortingOptions.CreatedAtEndFilter)
					);
				}

				if (sortingOptions.SortingColumn && sortingOptions.SortingColumn != '') {
					console.log('radiiiiiiiiiiiiiii');
					if (sortingOptions.SortingColumn == 'createdat')
						temp = temp.sort((a, b) => {
							if (new Date(a.createdAt) - new Date(b.createdAt) > 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
					if (sortingOptions.SortingColumn == 'Type') {
						var temp2 = transactions.sort((a, b) => {
							if (a.transactionType.localeCompare(b.transactionType) > 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
						temp = temp2.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
					}
					if (sortingOptions.SortingColumn == 'Currency') {
						var temp2 = transactions.sort((a, b) => {
							if (a.currency.localeCompare(b.currency) >= 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
						temp = temp2.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
					}

					if (sortingOptions.SortingColumn == 'Amount') {
						console.log('u amonu tsam 1111111111111111111111	');
						var temp2 = transactions.sort((a, b) => {
							if (a.amount - b.amount > 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
						temp = temp2.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
					} else console.log('u 2amonu tsam 1111111111111111111111	');
					if (sortingOptions.SortingColumn == 'Recipient') {
						var temp2 = transactions.sort((a, b) => {
							if (a.recipient.name?.localeCompare(b.recipient.name) > 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
						temp = temp2.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
					}
				} else console.log('ne radiiiiiiiiiii');
			}
			resolveO({ data: temp });
		}
	});
}

export function getGroupTransactions(group, mock) {
	return new Promise((resolve, reject) => {
		if (!mock)
			axios(
				env.ANDROID_API_ENV.url +
					'/api/Transaction/GroupTransactionsBy' +
					group +
					'?token=' +
					localStorage.getItem('token'),
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Acess-Control-Allow-Origin': '*',
						Authorization: 'Bearer ' + localStorage.getItem('token'),
					},
				}
			)
				.then(function (response) {
					resolve(response.data);
				})
				.catch(function (response) {
					//if (err.response.status === 401) navigate('/login');
					reject(401);
				});
		else {
			if (group === 'Currency') {
				var currs = ['CAD', 'CNY', 'EUR', 'GBP', 'JPY', 'USD', 'ZAR', 'BAM'];
				var result = [];
				currs.forEach(curr => {
					var sum = 0;
					var trans = transactions.filter(a => a.currency == curr);
					trans.forEach(t => {
						sum += t.amount;
					});
					result.push({
						keyValue: curr,
						transactions: trans,
						totalAmount: sum,
						numberOfTransactions: trans.length,
					});
				});
				resolve(result);
			}
			if (group == 'Type') {
				var types = ['C2C', 'B2B', 'C2B'];
				var result = [];
				types.forEach(ty => {
					var sum = 0;
					var trans = transactions.filter(a => a.transactionType == ty);
					trans.forEach(t => {
						sum += t.amount;
					});
					result.push({
						keyValue: ty,
						transactions: trans,
						totalAmount: sum,
						numberOfTransactions: trans.length,
					});
				});
				resolve(result);
			}
		}
	});
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
					reject(401);
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

export async function uploadFile(file, folder, transactionId) {
	let data = new FormData();
	data.append('file', file, file.name);
	data.append('Folder', folder);
	data.append('NodeName', transactionId);

	return axios.post(env.API_ENV.url + '/api/Document/UploadDocument', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}

export function fileTransactionClaim(request) {
	return axios(env.API_ENV.url + '/api/transactions/claim', {
		method: 'POST',
		data: request,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
}
