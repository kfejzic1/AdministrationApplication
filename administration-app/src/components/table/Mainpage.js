import '../../App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './NavBar';
import VendorsListHeader from './B2BTable/VendorsListHeader';
import VendorManagementModal from '../vendor/VendorManagementModal';
//import { Home } from './Home';
//import { Account } from './Account';

export const Mainpage = () => {
	return (
		<div className='App'>
			<Router>
				<NavBar />
				<Routes>
					<Route path='/B2BTable' element={<VendorsListHeader/>} />
					<Route path='/vendor' element={<VendorManagementModal/>} />
				</Routes>
			</Router>
		</div>
	);
};
