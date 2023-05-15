import React, { useState, useEffect } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Snackbar,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import { Alert } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { getAllVendors } from '../../services/vendorService';
import { requiredData, registrationRequest } from '../../services/eInvoicesServices'



const useStyles = makeStyles({
	root: {
		'& .MuiTableBody-root .Mui-selected, & .MuiTableBody-root .Mui-selected:hover': {
			'& .MuiTableBody-root .Mui-selected:hover': {
				backgroundColor: '#ffc976',
			},
			backgroundColor: '#ffe2b6',
			'& .MuiChip-root': {
				backgroundColor: '#ffaf36',
			},
		},

		'& .MuiTableBody-root .Mui-selected:hover': {
			backgroundColor: '#ffc976',
		},
		'& .css-177gid-MuiTableCell-root': {
			padding: '10px',
		},
	},

	button: {
		marginRight: '20px',
		'&.MuiButton-contained': {
			backgroundColor: '#ffaf36',
			color: 'black',
			'&:hover': {
				backgroundColor: '#ea8c00',
				boxShadow: 'none',
			},
			'&:disabled': {
				backgroundColor: '#ffffff',
				boxShadow: 'none',
				color: '#d3d3d3',
			},
		},
		'&.MuiButton-outlined': {
			color: '#ffaf36',
			border: '2px solid #ff9a00',

			'&:hover': {
				border: '2px solid #000000',
				color: '#000000',
			},
		},

		'&.MuiButton-text': {
			width: '250px',
			backgroundImage: 'linear-gradient(144deg, #ffb649 35%,#ffee00)',
			borderRadius: '10px',
			color: 'black',
			'&:hover': {
				backgroundImage: 'linear-gradient(144deg, #e9a642 65%,#e9de00)',
				boxShadow: 'none',
			},
			'&:disabled': {
				backgroundColor: '#ffffff',
				boxShadow: 'none',
				color: '#d3d3d3',
			},
		},
	},
});

const EInvoices = () => {
	const classes = useStyles();
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [b2b, setB2b] = useState([]);
	const [isRequired, setIsRequired] = useState(false);
	const [requiredDataPost, setRequiredData] = useState([]);
	const [selectedB2b, setSelectedB2b] = useState('');
	const [errTrue, setErrTrue] = useState(false);


	useEffect(() => {
		getAllVendors().then(response => {
			setB2b(response.data);
		})
	}, [])

	const setTrueRequired= (event) => {
		//this function is checking if user selected b2b name and then from get method we collect text field for him to create a request
		setSelectedB2b(event.target.value)
		//console.log("Uslo u ovu funkciju: a pritisnuo " + event.target.value);
		requiredData(event.target.value).then(response => {
			//console.log("Data koju vraca je " +  JSON.stringify(response.data));
			setRequiredData(response.data);
			setIsRequired(true);
		}).catch(error => console.log(error));
	}

	const setError = (err1) => {
		setErrTrue(true);
	}
	
	const handleRegister = event => {
		//this function takes info from text field that user inputed and send them to back for request to finish rout
		event.preventDefault();
		const form = event.target;
		var b2bName = selectedB2b;
		//console.log("B2b name " + b2bName + "a njegov tip " + typeof b2bName);
		var field1 = "null";
		var field2 = "null"; 
		var field3 = "null";
		var field4 = "null";
		if(form.field1){
			field1 = form.field1.value;
		} 
		console.log("Filed 1 " + field1 + "a njegov tip " + typeof field1);
		if(form.field2){
			field2 = form.field2.value;
		} 
		if(form.field3){
			field3 = form.field3.value; 
		}
		if(form.field4){
			field4 = form.field4.value;
		}  
		var data = { "b2BName": b2bName, "field1": field1, "field2": field2, "field3": field3, "field4" : field4}
		console.log("JSON ovdje" + JSON.stringify(data));
		registrationRequest(data).then(response => {
			setOpenSnackbar(true);
			setIsRequired(false);
		}).catch(error => setError(error));
	};

	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};

	return (
		<div>				
			
				<DialogTitle>Register for electronic invoices</DialogTitle>
				<DialogContent>
					<DialogContentText>Please fill out the form below to register for electronic invoices.</DialogContentText>
					<form onSubmit={handleRegister}>
                        <FormControl fullWidth style={{ width: '50%', marginLeft: '24%' }} margin='dense'>
							<InputLabel>B2B name</InputLabel>
							<Select label='Currency' name='currency' value={selectedB2b} onChange={setTrueRequired}>
								{b2b.map(curr => (
									<MenuItem  value={curr.name}>{curr.name}</MenuItem>
								)
								)}
							</Select>
						</FormControl>						
						{isRequired? (
							<div>
								{
								requiredDataPost.field1? (
								<TextField autoFocus style={{ width: '50%', marginLeft: '24%'}} margin='dense' name='field1' label={requiredDataPost.field1} fullWidth />
								) : null}
								{
								requiredDataPost.field2? (
									<TextField autoFocus style={{ width: '50%', marginLeft: '24%'}} margin='dense' name='field2' label={requiredDataPost.field2} fullWidth />
								) : null}
								{
								requiredDataPost.field3? (
									<TextField autoFocus style={{ width: '50%', marginLeft: '24%'}} margin='dense' name='field3' label={requiredDataPost.field3} fullWidth />
								) : null}
								{
								requiredDataPost.field4? (
									<TextField autoFocus style={{ width: '50%', marginLeft: '24%'}} margin='dense' name='field4' label={requiredDataPost.field4} fullWidth />
								) : null}										
							</div>											
						): (
							<h1></h1>
						)}
						{errTrue ? (
							<Alert style={{ width: '50%', marginLeft: '24%'}} severity='error' variant='filled'>
								Data you entered is not valid!!
							</Alert>
						): null}
						<DialogActions>
							<Button type='submit' style={{marginRight: '26%'}} className={`${classes.button}`} variant='contained'>
								Register
							</Button>
						</DialogActions>
					</form>
				</DialogContent>
				
			


			<Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity='success'>
					Registered for electronic invoices!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default EInvoices;
