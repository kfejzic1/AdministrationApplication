import { getTransactions } from '../../../services/TransactionsView/transactionsService';

import Transaction from './Transaction';
import { useState, useEffect } from 'react';
import cn from '../css/Transactions.module.css';
import TransactionDetails from './TransactionDetails';
import React from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import TransactionsListHeader from './TransactionsHeader';
export const TransactionsList = arg => {
	const [filterOptions, setFilterOptions] = useState(null);
	const [details, setDetails] = useState(null);
	const [transactionsRaw, setTransactionsRaw] = useState([]);
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [schouldLoad, setSchouldLoad] = useState(false);
	const [counter, setCounter] = useState(1);
	useEffect(() => {
		if (hasMore) {
			loadTransactions();
			setSchouldLoad(false);
		}
	}, [schouldLoad]);
	useEffect(() => {
		console.log('clear loaddding');
		loadTransactions('clear-load');
	}, [filterOptions]);
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	}, []);
	function loadTransactions(a) {
		console.log('filter=', filterOptions);
		setIsLoading(true);
		if (a == 'clear-load') setCounter(1);
		getTransactions(counter, 15, filterOptions)
			.then(transactions1 => {
				var temp1 = [...transactionsRaw, ...transactions1.data];
				if ('clear-load' == a) temp1 = transactions1.data;
				setTransactionsRaw(temp1);
				console.log('item)-', temp1[0].id);
				var transactionsdata = temp1.map((item, index) => (
					<Transaction key={item.id} setDetails={setDetails} index={index} prop={item}></Transaction>
				));
				setTransactions(transactionsdata);
				setHasMore(true);
				setCounter(counter + 1);
				setIsLoading(false);
			})
			.catch(e => {
				setHasMore(false);
				setIsLoading(false);
			});
	}

	function handleScroll(e) {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 0.1) {
			setSchouldLoad(true);
		}
	}

	return (
		<div className={cn.transactions_root}>
			{details != null ? (
				// ovdje treba uraditi rutu na localhost:3000/transaction/id/brojId
				<TransactionDetails
					setPaymentInfo={arg.setPaymentInfo}
					setIsLoading={setIsLoading}
					setDetails={setDetails}
					props={details}
				></TransactionDetails>
			) : (
				<div>
					<h1>Transactions</h1>
					<TransactionsListHeader setFilterOptions={setFilterOptions}></TransactionsListHeader>

					{transactions}
				</div>
			)}
			{isLoading && (
				<div>
					<LoadingSpinner></LoadingSpinner>
				</div>
			)}
		</div>
	);
};
