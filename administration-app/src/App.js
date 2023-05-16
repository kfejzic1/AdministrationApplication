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
import Voucher from './components/Voucher/Voucher';
import AccountCreationRequestsPanel from './components/AccountManagement/AccountCreationRequestsPanel';

import { SetUserPassword } from './components/UserManagement/SetUserPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Currencies from './components/Currencies/Currencies';
import VoucherRedemption from './components/VoucherRedemption/VoucherRedemption';
import './App.css';
import ExchangeRates from './components/Currencies/ExchangeRates/ExchangeRates';
import AdminClaims from './components/AdminClaims/AdminClaims';
import ClaimTable from './components/claims/ClaimTable';
import EinoviceRequiredData from './components/Einovice/EinoviceRequiredData/EinoviceRequiredData';
import { useEffect } from 'react';
import { getValidateToken } from './services/userService';
import EinoviceApprove from './components/Einovice/EinoviceRequiredData/EinoviceApprove';

import ElectronicInvoiceTemplate from './components/ElectronicInvoices/electronicInvoices';
import InvoiceList from './components/UserEInvoicesList/InvoiceList';

function App() {
	const [token, setToken] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		setToken(localStorage.getItem('token'));
		getValidateToken(localStorage.getItem('token')).then(response => {
			setIsAdmin(userAdmin(response.data));
		});
	}, []);

	const userAdmin = user => {
		if (user.roles) {
			var b = user.roles.filter(v => v === 'Admin')[0];
			if (b === 'Admin') {
				return true;
			}
			return false;
		}
		return false;
	};
	return (
		<GoogleOAuthProvider clientId='296207493341-aatp57afp9du4ujhiohuc14oqp78jmb8.apps.googleusercontent.com'>
			<div className='App'>
				<Router>
					<NavBar token={token} isAdmin={isAdmin} setToken={setToken} />
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
							path='/transaction/claims'
							element={
								<ProtectedRoute>
									<ClaimTable />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/payment/:currency/:transactionPurpose/:recipientName/:transactionType/:transactionAmount/:recipientAccountNumber/:senderAccount/:category'
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
						{isAdmin && (
							<Route
								path='/user-management'
								element={
									<ProtectedRoute>
										<UserManagement />
									</ProtectedRoute>
								}
							/>
						)}
						<Route
							path='/myaccounts'
							element={
								<ProtectedRoute>
									<AccountCreationRequestsPanel />
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
						<Route
							path='/redeem-voucher'
							element={
								<ProtectedRoute>
									<VoucherRedemption />
								</ProtectedRoute>
							}
						/>

						<Route
							path='/voucher'
							element={
								<ProtectedRoute>
									<Voucher />
								</ProtectedRoute>
							}
						/>

						<Route
							path='/claims'
							element={
								<ProtectedRoute>
									<AdminClaims />
								</ProtectedRoute>
							}
						/>

						<Route
							path='/myinvoices'
							element={
								<ProtectedRoute>
									<InvoiceList />
								</ProtectedRoute>
							}
						/>
						<Route path='/login' element={<LoginForm setToken={setToken} />} />
						{isAdmin ? (
							<Route
								path='/voucher'
								element={
									<ProtectedRoute>
										<Voucher />
									</ProtectedRoute>
								}
							/>
						) : null}
						{isAdmin && (
							<Route
								path='/claims'
								element={
									<ProtectedRoute>
										<AdminClaims />
									</ProtectedRoute>
								}
							/>
						)}
						{isAdmin ? (
							<Route
								path='/einoviceapprove'
								element={
									<ProtectedRoute>
										<EinoviceApprove />
									</ProtectedRoute>
								}
							/>
						) : null}
						{isAdmin ? (
							<Route
								path='/einovicedata'
								element={
									<ProtectedRoute>
										<EinoviceRequiredData />
									</ProtectedRoute>
								}
							/>
						) : null}
						<Route path='/login' element={<LoginForm setToken={setToken} setIsAdmin={setIsAdmin} />} />
						<Route path='/user/setpassword' element={<SetUserPassword reset={false} />} />
						<Route path='/user/resetpassword' element={<SetUserPassword reset={true} />} />
						<Route path='/register-eInvoice' element={<ElectronicInvoiceTemplate />} />
					</Routes>
				</Router>
			</div>
		</GoogleOAuthProvider>
	);
}
export default App;
