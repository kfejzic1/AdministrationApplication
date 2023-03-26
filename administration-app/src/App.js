import React, { useEffect, useState } from 'react';
import './App.css';
import VendorManagementModal from './components/vendor/VendorManagementModal';

function App() {
	useEffect(() => {
		localStorage.setItem('token', 'secret_token_from_swagger');
	}, []);

	return (
		<div className='App'>
			<VendorManagementModal />
		</div>
	);
}
export default App;
