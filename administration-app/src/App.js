import React, { useState } from 'react';
import LoginForm from './components/Login';
import TwoFactorView from './components/TwoFactor';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { testFunction } from './services/testingService';

function App() {
	const [testingData, setTestingData] = useState([]);

	const handleButtonClick = () => {
		testFunction().then(res => {
			setTestingData(res.data);
		});
	};

	return (
		<div className='App'>
			<Router>
				<div className='App1'>
					<Routes>
						<Route path='/login' element={<LoginForm />} />
						<Route path="/twofactor/:email" element={<TwoFactorView />} />
					</Routes>
				</div>
			</Router>

			<div>
				<button onClick={handleButtonClick}>Click Me</button>
			</div>
			<div>
				{testingData.length > 0
					? testingData.map((x, index) => (
							<div key={index}>
								<p>Date: {x.date}</p>
								<p>Temperature: {x.temperatureC}C</p>
								<p>Summary: {x.summary}</p>
								<p>--------------------</p>
							</div>
					  ))
					: null}
			</div>
		</div>
	);
}

export default App;
