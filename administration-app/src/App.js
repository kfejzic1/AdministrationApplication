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
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiYWRtaW5Vc2VyIiwianRpIjoiYTlhODQxMzItNDU5Zi00OTYyLTg4MWYtMzllM2MxNjVkZWJiIiwiZXhwIjoxNjgwMzE1NjM3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwNTEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.IKizMquAnlgacmLKPBaDlMRGtJ9ujKfqskBLIzkTNHY'
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
