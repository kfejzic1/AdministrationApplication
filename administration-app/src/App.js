import React, { useState } from 'react';
import { Label, Button, Textarea } from 'flowbite-react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import Multiselect from 'multiselect-react-dropdown';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { testFunction } from './services/testingService';
import VendorManagementModal from './components/vendor/VendorManagementModal';

const useStyles = makeStyles(theme => ({
	/*formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },*/
}));

function UserForm() {
	const vendor = {
		name: '',
		address: '',
		details: '',
		users: [],
	};
	const classes = useStyles();
	const [username, setUsername] = useState('');
	const [address, setAddress] = useState('');
	const [details, setDetails] = useState('');
	const [selectedUsers, setSelectedUsers] = useState([]);

	return (
		<div className='App'>
			<VendorManagementModal />
		</div>
	);
}
export default App;
