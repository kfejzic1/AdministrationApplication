import React from 'react';
import LoginForm from './components/Login/Login';
import ProfilePage from './components/User/UserProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorsTable from './components/vendor/vendorsPanel/VendorsTable';
import Location from './components/vendor/Location/Location';
import ProtectedRoute from './components/ProtectedRoute';
import { NavBar } from './components/NavBar/NavBar';
import { TransactionsList } from './components/TransactionsView/transactions/TransactionsList';
import { Payment } from './components/Payment/Payment';
import { CustomerCreation } from './components/CustomerManagementView/CustomerCreation';
import { CustomerEdit } from './components/CustomerManagementView/CustomerEdit';
import { CustomerPassword } from './components/CustomerManagementView/CustomerPassword';
import { ResetCustomerPassword } from './components/CustomerManagementView/ResetCustomerPassword';

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
						path='/B2BLocation/:id'
						element={
							<ProtectedRoute>
								<Location />
							</ProtectedRoute>
						}
					/>
					<Route path='/login' element={<LoginForm />} />
					<Route path='/customer/setcustomerpassword' element={<CustomerPassword />} />
					<Route path='/customer/resetcustomerpassword' element={<CustomerPassword />} />
					<Route
						path='/customer/edit/:id'
						element={
							<ProtectedRoute>
								<CustomerEdit />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/customer/create'
						element={
							<ProtectedRoute>
								<CustomerCreation />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}
export default App;
