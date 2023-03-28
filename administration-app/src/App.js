import React, { useEffect, useState } from 'react';
import './App.css';
import VendorManagementModal from './components/vendor/VendorManagementModal';

function App() {
	useEffect(() => {
		localStorage.setItem(
			'token',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiYWRtaW5Vc2VyIiwianRpIjoiN2U0N2ZkMTQtMjJkNS00YzU4LWJkNDktZTNmMTFkZTU1ZmY4IiwiZXhwIjoxNjc5OTUwNzA3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwNTEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.NhHqvn4Uwdxuv6IQwE9uv-RNbGrT_dZOWweP2H6bD5Y'
		);
	}, []);

	return (
		<div className='App'>
			<VendorManagementModal />
		</div>
	);
}
export default App;
