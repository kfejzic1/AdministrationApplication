import '../../App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './NavBar';
import { TransactionsList } from '../TransactionsView/transactions/TransactionsList';
import { Home } from './Home';
import { Payment } from '../Payment/Payment';

export const Mainpage = () => {
	return (
		<div className='App'>
			<Router>
				<NavBar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/transactions' element={<TransactionsList />} />
					<Route
						path='/payment/:currency/:type/:recipientName/:transactionAmount/:recipientAccountNumber'
						element={<Payment />}
					/>
					<Route path='/payment' element={<Payment />} />
				</Routes>
			</Router>
		</div>
	);
};
