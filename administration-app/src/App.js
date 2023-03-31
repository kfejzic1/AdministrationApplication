import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import VendorCreateModal from './components/vendor/vendorCreateModal/VendorCreateModal';
import VendorsTableHead from './components/vendor/vendorsPanel/VendorsTableHead';
import { NavBar } from './components/navigationBar/NavBar';
import VendorsTable from './components/vendor/vendorsPanel/VendorsTable';

function App() {
	useEffect(() => {
		localStorage.setItem(
			'token',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiYWRtaW5Vc2VyIiwianRpIjoiZmE2NTY1OWYtNDM0ZS00MmU1LTgyNzgtMDU3N2UxNDFjZGM5IiwiZXhwIjoxNjgwMjc0NTA0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwNTEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.QDw6AxTpRq1hTQ_MzYpt8PfMx3EUJQrOpgoLRrUZxDA'
		);
	}, []);

	return (
		<div className='App'>
			<Router>
				<NavBar />
				<Routes>
					<Route path='/B2BPanel' element={<VendorsTable />} />
				</Routes>
			</Router>
		</div>
	);
}
export default App;
