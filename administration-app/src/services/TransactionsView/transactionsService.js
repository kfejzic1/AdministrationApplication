import axios from 'axios';
import { env } from '../../config/env';
import { transactions } from './mock';
export function getBasicTransactions(number = 10) {
	return number < transactions.length
		? { data: transactions.slice(0, number), hasMore: true }
		: { data: transactions, hasMore: false };
}

export function getTransactions(pageNumber, pageSize, sortingOptions) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			var temp = transactions;
			if (sortingOptions != null) {
				if (sortingOptions.Recipient != '') {
					temp = temp.filter(transaction7 => transaction7.recipient.includes(sortingOptions.Recipient));
				}
				if (sortingOptions.Status != '') {
					temp = temp.filter(transaction => transaction.status == sortingOptions.Status);
				}
				if (sortingOptions.MinAmount != '') {
					temp = temp.filter(transaction => transaction.amount > parseInt(sortingOptions.MinAmount));
				}
				if (sortingOptions.MaxAmount != '') {
					temp = temp.filter(transaction => transaction.amount < parseInt(sortingOptions.MaxAmount));
				}
				if (!sortingOptions.StartDate.length > 17) {
					temp = temp.filter(transaction => new Date(transaction.dateTime) > new Date(sortingOptions.StartDate));
				}
				if (sortingOptions.EndDate.length > 17) {
					temp = temp.filter(transaction => new Date(transaction.dateTime) < new Date(sortingOptions.EndDate));
				}

				if (sortingOptions.SortingOptions != '') {
					if (sortingOptions.SortingOptions == 'DateTime')
						temp = temp.sort((a, b) => {
							console.log(a.toString(), b.dateTime);
							if (new Date(a.dateTime) - new Date(b.dateTime) > 0) {
								if (sortingOptions.Ascending) return 1;
								else return -1;
							} else {
								if (!sortingOptions.Ascending) return 1;
								else return -1;
							}
						});
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
						console.log('recpinet sort', temp);
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
			resolve({ data: temp.slice((pageNumber - 1) * pageSize, pageNumber * pageSize) });
		}, 100);
	});

	//mock is above, real is underneath
	if (sortingOptions != null) {
		if (sortingOptions.MinAmount === '') delete sortingOptions.MinAmount;
		if (sortingOptions.SortingOptions === '') delete sortingOptions.SortingOptions;
		if (sortingOptions.Recipient === '') delete sortingOptions.Recipient;
		if (sortingOptions.DateTimeEnd === '') delete sortingOptions.DateTimeEnd;
		if (sortingOptions.DateTimeStart === '') delete sortingOptions.DateTimeStart;
		if (sortingOptions.Ascending === '') delete sortingOptions.Ascending;
		if (sortingOptions.Status === '') delete sortingOptions.Status;
		if (sortingOptions.MaxAmount === '') delete sortingOptions.MaxAmount;
	}

	return axios(env.API_ENV.url + '/api/transactions?pageNumber=' + pageNumber + '&pageSize=' + pageSize, {
		method: 'GET',
		params: sortingOptions,
		headers: {
			'Content-Type': 'application/json',
		},
	});
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
