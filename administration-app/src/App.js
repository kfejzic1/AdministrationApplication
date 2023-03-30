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
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiYWRtaW5Vc2VyIiwianRpIjoiNDI3N2JhOGItMzlhMC00ZGNkLTkxZmItODQ5N2RlN2M1NmQwIiwiZXhwIjoxNjgwMjE4NjA0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwNTEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.Ewe_5gIgjuaADuPi2g9B0arpsnpi4Muy7xkd_wiuqLs'
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
