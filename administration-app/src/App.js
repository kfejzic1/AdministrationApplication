import React from 'react';
import LoginForm from './components/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Router>
				<div className='App1'>
					<Routes>
						<Route path='/login' element={<LoginForm />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
