import React, { useState, useEffect } from 'react';
import { createUser, editUser, getAllUsers, requestPasswordReset } from '../../services/userManagementService';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
    Divider,
	TextField,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	Snackbar,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	FormControlLabel,
	Switch,
	Paper,
	Tooltip,
	Toolbar,
	ButtonGroup,
} from '@mui/material';
import { Alert } from '@mui/material';
import AccTableHead from './AccTableHead';
import { Stack } from '@mui/system';
import { uploadDocument } from '../../services/documentService';
import CreateIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockResetIcon from '@mui/icons-material/LockReset';
import EditIcon from '@mui/icons-material/Edit';
import { getAllCurrencies}  from '../../services/currencyService'
import { Typography } from '@material-ui/core';

const theme = createTheme({
	components: {
		MuiSwitch: {
			styleOverrides: {
				switchBase: {
					// Controls default (unchecked) color for the thumb
					color: '#ccc',
				},
				colorPrimary: {
					'&.Mui-checked': {
						// Controls checked color for the thumb
						color: '#ffaf36',
					},
				},
				track: {
					// Controls default (unchecked) color for the track
					opacity: 0.2,
					backgroundColor: '#c1bfbf',
					'.Mui-checked.Mui-checked + &': {
						// Controls checked color for the track
						opacity: 0.7,
						backgroundColor: '#ffc976',
					},
				},
			},
		},
	},
});

const tableTheme = createTheme({
	palette: {
		primary: {
			main: '#E7EBF0',
		},
		secondary: {
			main: '#ffe2b6',
		},
		secondary2: {
			main: '#ffaf36',
		},
	},
});

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

const mockAccounts = [
	{id: '123', description: 'Test account', currency: 'BAM'},
	{id: '1234', description: 'Test account 2', currency: 'USD'}	
];

const B2CAccManagement = () => {
	const classes = useStyles();
	const [users, setUsers] = useState([]);
	const [accounts, setAccounts] = useState(mockAccounts);
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
	const [selectedUser, setSelectedUser] = useState({});
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openSnackbarPassword, setOpenSnackbarPassword] = useState(false);
	const [change, setChange] = useState(false);
	const [currencies, setCurrencies] = useState([{name: 'No currencies found'}]);
	const [dense, setDense] = useState(false);
	const [files, setFiles] = useState(null);

	useEffect(() => {
		
		getAllCurrencies().then(response => {
			console.log(response.data);
			setCurrencies(
				response.data.map(u => {
					return {
						id: u.id,
						name: u.name
					};
				})
			)
		});

        // Staviti getallaccounts za tog b2c-a
        
	}, [change]);
	const handleCreateDialogOpen = () => {
		setOpenCreateDialog(true);
	};

	const handleCreateDialogClose = () => {
		setOpenCreateDialog(false);
	};

	const handleCreateUser = event => {
		/*event.preventDefault();
		const form = event.target;
		const newUser = {
			firstName: form.name.value,
			lastName: form.surname.value,
			email: form.email.value,
			phoneNumber: form.phone.value,
			address: form.address.value,
			role: form.role.value,
		};
		createUser(newUser)
			.then(response => {
				setOpenCreateDialog(false);
				setOpenSnackbar(true);
				setChange(!change);
			})
			.catch(error => console.error(error));*/
		
		if (files) {
			for (var i = 0; i < files.length; i++) {
				let formdata = new FormData();
				formdata.append('document', files[i]);
				//console.log(formdata);
				
				//uploadDocument(formdata);
			}
		}
		
	};

	const testDocument = () => {
		if (files) {
			console.log(files);
			for (var i = 0; i < files.length; i++) {
				let formdata = new FormData();
				formdata.append('ContentType', 'application/pdf');
				formdata.append('Folder', '/user-requests');
				formdata.append('file', files[i]);

				for (var pair of formdata.entries()) {
					console.log(pair[0]); 
					console.log(pair[1]);
				}
				uploadDocument(formdata).then(res => {console.log(res)});
			}
		}
	}

	const handleChangeDense = event => {
		setDense(event.target.checked);
	};

	function handleFiles(files) {
		setFiles(files.target.files);
	};

	return (
		<div>
			<Box sx={{ width: '95%', margin: 'auto', pt: '15px', mt: '15px' }}>
				<Paper sx={{ width: '100%', mb: 2, border: 'none' }}>
					<ThemeProvider theme={tableTheme}>
						<TableContainer>
							<Toolbar sx={{ justifyContent: 'space-between' }}>
								<div></div>
								<Stack direction='row'>
									<Tooltip title='Create Account'>
										<Button
											className={classes.button}
											size='small'
											variant='text'
											endIcon={<CreateIcon />}
											onClick={handleCreateDialogOpen}
										>
											Request Account Creation
										</Button>
									</Tooltip>
								</Stack>
							</Toolbar>
							<Table
								className={classes.root}
								sx={{ minWidth: '100%' }}
								aria-labelledby='tableTitle'
								size={dense ? 'small' : 'medium'}
							>
								<AccTableHead onClick={handleCreateDialogOpen} />
								<TableBody>
									{accounts.map(account => (
										<TableRow
											key={account.id}
											classes={{
												root: classes.tableRowRoot,
												selected: classes.tableRowSelected,
											}}
											hover
											role='checkbox'
											tabIndex={-1}
											sx={{ cursor: 'pointer' }}
										>
											<TableCell align='left'>{account.id}</TableCell>
											<TableCell align='left'>{account.description}</TableCell>
											<TableCell align='left'>{account.currency}</TableCell>
											
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</ThemeProvider>
				</Paper>
				<ThemeProvider theme={theme}>
					<FormControlLabel
						className={classes.FormControlLabel}
						sx={{ color: 'black' }}
						control={<Switch checked={dense} onChange={handleChangeDense} />}
						label='Dense padding'
					/>
				</ThemeProvider>
			</Box>

			<Dialog open={openCreateDialog} onClose={handleCreateDialogClose}>
				<DialogTitle>Create Account</DialogTitle>
				<DialogContent>
					<DialogContentText>Please fill out the form below to create a new account.</DialogContentText>
					<form onSubmit={handleCreateUser}>
                        <TextField margin='dense' name='account-id' label='Account Number' fullWidth />
                        <TextField margin='dense' name='description' label='Description' fullWidth />
						<FormControl fullWidth margin='dense'>
							<InputLabel>Currency</InputLabel>
							<Select label='Currency' name='currency' defaultValue={currencies[0].name}>
                                {
                                    currencies.map((currency) => {
                                        return <MenuItem value={currency.name} key={currency.name}>{currency.name}</MenuItem>
                                    })
                                }
							</Select>
						</FormControl>
                        <Divider sx={{ mt: 1, mb: 1 }}></Divider>
                        <Typography variant="p">Upload documents for approval here:</Typography>
                        <input
                            accept="application/pdf"
                            id="button-file"
                            type="file"
                            multiple
							onChange={(e) => handleFiles(e)}
                        />

						<DialogActions>
							<Button onClick={handleCreateDialogClose} className={`${classes.button}`} variant='outline'>
								Cancel
							</Button>
							<Button onClick={testDocument} className={`${classes.button}`} variant='contained'>
								Send Request
							</Button>
						</DialogActions>
					</form>
				</DialogContent>
			</Dialog>
			
		</div>
	);
};

export default B2CAccManagement;