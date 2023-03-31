import axios from 'axios';
import { env } from '../../config/env';
import { transactions } from './mock';
export function getBasicTransactions(number = 10) {
	return number < transactions.length
		? { data: transactions.slice(0, number), hasMore: true }
		: { data: transactions, hasMore: false };
}

export function getTransactions(pageNumber, pageSize, sortingOptions) {
	console.log('broj=', pageNumber, pageSize);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			var temp = transactions;
			if (sortingOptions != null) {
				console.log('Sorting sint null');
				if (sortingOptions.Recipient != '') {
					console.log('sad proje', temp[0].recipient, sortingOptions.Recipient, JSON.stringify(temp));
					temp = temp.filter(transaction7 => transaction7.recipient.includes(sortingOptions.Recipient));
					console.log('sad je recipes', sortingOptions.Recipient, JSON.stringify(temp));
				}
				if (sortingOptions.Status != '') {
					console.log('sad1 je recipes', sortingOptions.Status, temp[0].status, JSON.stringify(temp));

					temp = temp.filter(transaction => transaction.status == sortingOptions.Status);
				}
				if (sortingOptions.MinAmount != '') {
					temp = temp.filter(transaction => transaction.amount > parseInt(sortingOptions.MinAmount));
					console.log('sad 2je recipes', sortingOptions.ecipie, JSON.stringify(temp));
				}
				if (sortingOptions.MaxAmount != '') {
					temp = temp.filter(transaction => transaction.amount < parseInt(sortingOptions.MaxAmount));
					console.log('sad3 je recipes', sortingOptions.Recipient, JSON.stringify(temp));
				}
				if (
					!sortingOptions.StartDate.includes('TT') &&
					sortingOptions.StartDate != 'T' &&
					sortingOptions.StartDate != 'T00:00:00'
				) {
					temp = temp.filter(transaction => new Date(transaction.dateTime) > new Date(sortingOptions.StartDate));
					console.log('sad 4je recipes', sortingOptions.StartDate, transactions[0].dateTime, JSON.stringify(temp));
				}
				if (
					!sortingOptions.EndDate.includes('TT') &&
					sortingOptions.EndDate != 'T' &&
					sortingOptions.EndDate != 'T00:00:00'
				) {
					temp = temp.filter(transaction => new Date(transaction.dateTime) < new Date(sortingOptions.EndDate));
					console.log('sad 5je recipes', sortingOptions.EndDate, transactions[0].dateTime, JSON.stringify(temp));
				}
			}
			console.log(
				'rez=',
				(pageNumber - 1) * pageSize,
				pageNumber * pageSize,
				temp.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
			);
			resolve({ data: temp.slice((pageNumber - 1) * pageSize, pageNumber * pageSize) });
		}, 100);
	});

	//mock is above, real is underneath

	/*return axios(env.API_ENV.url + '/api/transactions?pageNumber=' + pageNumber + '&pageSize=' + pageSize, {
		method: 'GET',
		params: sortingOptions,
		headers: {
			'Content-Type': 'application/json',
		},
	});*/
}
export function getTransactionDetails(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({ data: transactions.filter(a => a.id == id)[0] });
		}, 100);
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
