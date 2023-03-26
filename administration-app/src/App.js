import React, { useState } from 'react';
import { Label, Button, Textarea } from 'flowbite-react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import Multiselect from 'multiselect-react-dropdown';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { testFunction } from './services/testingService';
import VendorManagementModal from './components/vendor/VendorManagementModal';

function App() {
	const [testingData, setTestingData] = useState([]);

	const handleButtonClick = () => {
		testFunction().then(res => {
			setTestingData(res.data);
		});
	};

	return (
		<div className='App'>
			<VendorManagementModal />
		</div>
	);
}
export default App;
