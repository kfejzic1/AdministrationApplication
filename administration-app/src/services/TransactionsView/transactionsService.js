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
		if (sortingOptions.CreatedAtEndFilter === '') delete sortingOptions.CreatedAtEndFilter;
		else if (sortingOptions.CreatedAtEndFilter)
			sortingOptions.CreatedAtEndFilter = JSON.stringify(sortingOptions.CreatedAtEndFilter).replaceAll('"', '');
		if (sortingOptions.CreatedAtStartFilter === '') delete sortingOptions.CreatedAtStartFilter;
		else if (sortingOptions.CreatedAtStartFilter)
			sortingOptions.CreatedAtStartFilter = JSON.stringify(sortingOptions.CreatedAtStartFilter).replaceAll('"', '');
		if (sortingOptions.TransactionTypeFilter === '') delete sortingOptions.TransactionTypeFilter;
		if (sortingOptions.AmountEndFiltert === '') delete sortingOptions.AmountEndFiltert;
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
			sortingOptions = mockSortingOptons;
			var temp = transactions.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
			if (sortingOptions != null) {
				if (sortingOptions.Recipient && sortingOptions.Recipient != '') {
					temp = temp.filter(transaction7 => transaction7.recipient.name?.includes(sortingOptions.Recipient));
				}
				//console.log('temp=', sortingOptions.Recipient, pageNumber, pageSize, JSON.stringify(temp));

				if (sortingOptions.Status && sortingOptions.Status != '') {
					temp = temp.filter(transaction => transaction.transactionType == sortingOptions.Status);
				}

				if (sortingOptions.MinAmount && sortingOptions.MinAmount != '') {
					temp = temp.filter(transaction => transaction.amount > parseInt(sortingOptions.MinAmount));
				}
				if (sortingOptions.MaxAmount && sortingOptions.MaxAmount != '') {
					temp = temp.filter(transaction => transaction.amount < parseInt(sortingOptions.MaxAmount));
				}

				if (sortingOptions.DateTimeStart && sortingOptions.DateTimeStart.length > 14) {
					temp = temp.filter(transaction => new Date(transaction.date) > new Date(sortingOptions.DateTimeStart));
				}
				if (sortingOptions.DateTimeEnd && sortingOptions.DateTimeEnd.length > 14) {
					temp = temp.filter(transaction => new Date(transaction.date) < new Date(sortingOptions.DateTimeEnd));
				}

				if (sortingOptions.SortingOptions && sortingOptions.SortingOptions != '') {
					if (sortingOptions.SortingOptions == 'DateTime')
						temp = temp.sort((a, b) => {
							if (new Date(a.date) - new Date(b.date) > 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
					if (sortingOptions.SortingOptions == 'Type') {
						temp = temp.sort((a, b) => {
							if (a.transaction_type.localeCompare(b.transaction_type) > 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
					}
					if (sortingOptions.SortingOptions == 'Currency') {
						temp = temp.sort((a, b) => {
							if (a.currency.localeCompare(b.currency) > 0) {
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
							if (a.recipient.name?.localeCompare(b.recipient.name) > 0) {
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
				var types = ['C2C', 'B2B', 'B2C'];
				var result = [];
				types.forEach(ty => {
					var sum = 0;
					var trans = transactions.filter(a => a.transaction_purpose == ty);
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
