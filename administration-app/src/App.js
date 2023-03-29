import React, { useState } from 'react';
import './App.css';
import { testFunction } from './services/testingService';
import { Mainpage } from './components/TransactionsView/Mainpage';

function App() {
	const [testingData, setTestingData] = useState([]);

	const handleButtonClick = () => {
		testFunction().then(res => {
			setTestingData(res.data);
		});
	};

	return (
		<div className='App'>
			<div>
				<Mainpage />
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
