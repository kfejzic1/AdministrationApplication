import React, { useState } from 'react';
import logo from './logo.svg';
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
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
					Learn React
				</a>
			</header>
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
