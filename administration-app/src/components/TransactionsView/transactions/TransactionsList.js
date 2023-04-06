import { getTransactions } from '../../../services/TransactionsView/transactionsService';

import Transaction from './Transaction';
import { useState, useEffect } from 'react';
import cn1 from '../LoadingSpinner/LoadingSpinner.module.css';
import TransactionDetails from './TransactionDetails';
import React from 'react';
import { createTheme, Box, Table, TableBody, TableContainer, Paper, Typography, ThemeProvider } from '@mui/material';
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
		setCounter(1);
		loadTransactions('clear-load');
	}, [filterOptions]);
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	}, []);
	function loadTransactions(a) {
		var tempCounter = counter;
		setIsLoading(true);
		if (a == 'clear-load') {
			setCounter(1);
			tempCounter = 1;
		}
		getTransactions(tempCounter, 15, filterOptions)
			.then(transactions1 => {
				var temp1 = [...transactionsRaw, ...transactions1.data];
				if ('clear-load' == a) {
					temp1 = transactions1.data;
				}
				setTransactionsRaw(temp1);
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
	const theme = createTheme({
		components: {
			// Name of the component
			MuiButton: {
				defaultProps: {
					// The props to change the default for.
					variant: 'contained', // No more ripple, on the whole application 💣!
				},
			},
		},
	});

	return (
		<Box>
			<ThemeProvider theme={theme}>
				{details != null ? (
					// ovdje treba uraditi rutu na localhost:3000/transaction/id/brojId
					<TransactionDetails
						setPaymentInfo={arg.setPaymentInfo}
						setIsLoading={setIsLoading}
						setDetails={setDetails}
						props={details}
					></TransactionDetails>
				) : (
					<Box sx={{ bgcolor: '#eceff1' }}>
						<Typography variant='h2' sx={{ bgcolor: '#fff', width: '100%', pb: 3 }} align='center'>
							Transactions
						</Typography>
						<Box sx={{ width: '95%', margin: 'auto', pt: '15px' }}>
							<Paper sx={{ width: '100%', mb: 2, border: 'none' }}>
								<TableContainer>
									<Table>
										<TransactionsListHeader setFilterOptions={setFilterOptions}></TransactionsListHeader>
										<TableBody>{transactions}</TableBody>
									</Table>
								</TableContainer>
							</Paper>
						</Box>
					</Box>
				)}
				{isLoading && (
					<div className={cn1.spinnerRoot}>
						<LoadingSpinner></LoadingSpinner>
					</div>
				)}
			</ThemeProvider>
		</Box>
	);
};
