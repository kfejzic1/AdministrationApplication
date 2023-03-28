import { getTransactions } from '../../../services/TransactionsView/transactionsService';
import TransactionsListHeader from './TransactionsListHeader';
import Transaction from './Transaction';
import { useState, useEffect } from 'react';
import '../css/Transactions.css';
import TransactionDetails from './TransactionDetails';
import React from 'react';

export const TransactionsList = () => {
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
		window.addEventListener('scroll', handleScroll);
	}, []);
	function loadTransactions() {
		setIsLoading(true);
		getTransactions(counter, 15)
			.then(transactions1 => {
				var temp1 = [...transactionsRaw, ...transactions1.data];
				setTransactionsRaw(temp1);
				var transactionsdata = temp1.map((item, index) => (
					<Transaction setDetails={setDetails} index={index} prop={item}></Transaction>
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
		<div className='transactions-root'>
			{details != null ? (
				// ovdje treba uraditi rutu na localhost:3000/transaction/id/brojId
				<TransactionDetails setIsLoading={setIsLoading} setDetails={setDetails} props={details}></TransactionDetails>
			) : (
				<div>
					<h1>Transactions</h1>
					<TransactionsListHeader></TransactionsListHeader> {transactions}
				</div>
			)}
			{isLoading && <div>Loading...</div>}
			{!isLoading && hasMore && (
				<button
					className='loadBtn'
					onClick={() => {
						setSchouldLoad(true);
					}}
				>
					<p>Load more transactions</p>
				</button>
			)}
		</div>
	);
};
