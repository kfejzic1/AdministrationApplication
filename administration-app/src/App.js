import React from 'react';
import LoginForm from './components/Login/Login';
import ProfilePage from './components/User/UserProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorManagementModal from './components/vendor/VendorManagementModal';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
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
