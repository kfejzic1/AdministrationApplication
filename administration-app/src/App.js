import React from 'react';
import LoginForm from './components/Login/Login';
import ProfilePage from './components/User/UserProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorsTable from './components/vendor/vendorsMainPanel/VendorsTable';
import VendorDetails from './components/vendor/VendorDetails';
import ProtectedRoute from './components/ProtectedRoute';
import { NavBar } from './components/NavBar/NavBar';
import { TransactionsList } from './components/TransactionsView/transactions/TransactionsList';
import { Payment } from './components/Payment/Payment';

import './App.css';

function App() {
	return (
		<div className='App'>
			<Router>
				<NavBar />
				<Routes>
					<Route path='/' element={<h1 style={{ textAlign: 'center' }}>SI projekat</h1>} />
					<Route path='/transactions' element={<TransactionsList />} />
					<Route
						path='/payment/:currency/:type/:recipientName/:transactionAmount/:recipientAccountNumber'
						element={<Payment />}
					/>
					<Route path='/payment' element={<Payment />} />

					<Route
						path='/user'
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/vendor-management'
						element={
							<ProtectedRoute>
								<VendorsTable />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/B2BDetails/:id'
						element={
							<ProtectedRoute>
								<VendorDetails />
							</ProtectedRoute>
						}
					/>
					<Route path='/login' element={<LoginForm />} />
				</Routes>
			</Router>
		</div>
	);
}
export default App;
