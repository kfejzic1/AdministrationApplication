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
import { useState } from 'react';
import UserManagement from './components/UserManagement/UserManagement';

import { SetUserPassword } from './components/UserManagement/SetUserPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoginSocialFacebook } from 'reactjs-social-login'
import Currencies from './components/Currencies/Currencies'
import './App.css';
import ExchangeRates from './components/Currencies/ExchangeRates/ExchangeRates';

function App() {
	const [token, setToken] = useState(null);
	return (
		<GoogleOAuthProvider clientId='296207493341-aatp57afp9du4ujhiohuc14oqp78jmb8.apps.googleusercontent.com'>
			<div className='App'>
				<Router>
					<NavBar token={token} setToken={setToken} />
					<Routes>
						<Route path='/' element={<h1 style={{ textAlign: 'center' }}>SI projekat</h1>} />
						<Route
							path='/transactions'
							element={
								<ProtectedRoute>
									<TransactionsList />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/payment/:currency/:transactionPurpose/:recipientName/:transactionType/:transactionAmount/:recipientAccountNumber'
							element={
								<ProtectedRoute>
									<Payment />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/payment/:currency/:transactionPurpose/:transactionType/:transactionAmount/:phoneNumber'
							element={
								<ProtectedRoute>
									<Payment />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/payment'
							element={
								<ProtectedRoute>
									<Payment />
								</ProtectedRoute>
							}
						/>

						<Route
							path='/user'
							element={
								<ProtectedRoute>
									<ProfilePage setToken={setToken} />
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
						<Route
							path='/user-management'
							element={
								<ProtectedRoute>
									<UserManagement />
								</ProtectedRoute>
							}
						/>

						<Route
							path='/currencies'
							element={
								<ProtectedRoute>
									<Currencies />
								</ProtectedRoute>
							}
						/>

						<Route path='/login' element={<LoginForm setToken={setToken} />} />
						<Route path='/user/setpassword' element={<SetUserPassword reset={false} />} />
						<Route path='/user/resetpassword' element={<SetUserPassword reset={true} />} />
					</Routes>
				</Router>
			</div>
		</GoogleOAuthProvider>
	);
}
export default App;
