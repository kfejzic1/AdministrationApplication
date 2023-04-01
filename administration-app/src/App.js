import React, { useState } from 'react';
import './App.css';
import { testFunction } from './services/testingService';
import { Mainpage } from './components/NavBar/Mainpage';

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
		</div>
	);
}

export default App;
