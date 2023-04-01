import React from 'react';
import LoginForm from './components/Login/Login';
import ProfilePage from './components/UserProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/user' element={<ProfilePage />} />
					<Route path='/login' element={<LoginForm />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
