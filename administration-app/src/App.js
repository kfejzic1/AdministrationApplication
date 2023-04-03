import React from 'react';
import LoginForm from './components/Login/Login';
import ProfilePage from './components/User/UserProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorManagementModal from './components/vendor/VendorManagementModal';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { TransactionsList } from './components/TransactionsView/transactions/TransactionsList';
import { Payment } from './components/Payment/Payment';
function App() {
	return (
		<div className='App'>
			<Router>
				<NavBar />
				<Routes>
					<Route path='/' element={<h1>SI projekat</h1>} />
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
								<VendorManagementModal />
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
