import React, { useEffect, useState } from 'react';
import './App.css';
//import VendorManagementModal from './components/vendor/VendorManagementModal';
//import TransactionsListHeader from './components/table/B2BTable/TransactionsListHeader';
import { Mainpage } from './components/table/Mainpage';

function App() {
	useEffect(() => {
		localStorage.setItem(
			'token',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiYWRtaW5Vc2VyIiwianRpIjoiN2ZjYjRiMGItYTkwMS00NDY3LThhYWQtNGI1NjY5ODJiNDQ2IiwiZXhwIjoxNjgwMjEzMzE3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwNTEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ._ZH6kgyZujBt_mJ4Sjcs2QJ3hmLbfN02WORVROeeNfM'
		);
	}, []);

	return (
		<div className='App'>
			<Mainpage/>
		</div>
	);
}
export default App;
