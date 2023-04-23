import React, { useState, useEffect } from 'react';
import { createUser, editUser, getAllUsers, requestPasswordReset } from '../../services/userManagementService';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
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
	List,
	ListItem,
	ListItemText,
	Checkbox,
	FormGroup
} from '@mui/material';
import { Alert } from '@mui/material';
import UsersTableHead from './UsersTableHead';
import { Stack } from '@mui/system';

import CreateIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockResetIcon from '@mui/icons-material/LockReset';
import EditIcon from '@mui/icons-material/Edit';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

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

const UserManagement = () => {
	const classes = useStyles();
	const [users, setUsers] = useState([]);
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
	const [openAccessListDialog, setOpenAccessListDialog] = useState(false);
	const [selectedUser, setSelectedUser] = useState({});
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openSnackbarPassword, setOpenSnackbarPassword] = useState(false);
	const [change, setChange] = useState(false);

	const [dense, setDense] = useState(false);
	const [checkedItems, setCheckedItems] = useState([]);
	const [checkedItemsBefore, setCheckedItemsBefore] = useState([]);

	useEffect(() => {
		getAllUsers().then(response => {
			setUsers(
				response.data.map(u => {
					return {
						id: u.result.user.id,
						firstName: u.result.user.firstName,
						lastName: u.result.user.lastName,
						email: u.result.user.email,
						phoneNumber: u.result.user.phoneNumber,
						address: u.result.user.address,
						role: u.result.userRole,
					};
				})
			);
		});
	}, [change]);
	const handleCreateDialogOpen = () => {
		setOpenCreateDialog(true);
	};

	const handleCreateDialogClose = () => {
		setOpenCreateDialog(false);
	};

	const handleCreateUser = event => {
		event.preventDefault();
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
			.catch(error => console.error(error));
	};

	const handleUpdateDialogOpen = user => {
		setSelectedUser(user);
		setOpenUpdateDialog(true);
	};

	const handleUpdateDialogClose = () => {
		setSelectedUser({});
		setOpenUpdateDialog(false);
	};

	const handleAccessListDialogOpen = user => {
		setSelectedUser(user);
		setCheckedItemsBefore(checkedItems);
		setOpenAccessListDialog(true);
	}

	const handleAccessListDialogClose = () => {
		setSelectedUser({});
		setCheckedItems(checkedItemsBefore)
		setOpenAccessListDialog(false);
	}

	const handleAccessListUpdate = () => {
		setSelectedUser({});
		setOpenAccessListDialog(false);
	}

	const handleUpdateUser = event => {
		event.preventDefault();
		const form = event.target;
		const updatedUser = {
			id: selectedUser.id,
			firstName: form.name.value,
			lastName: form.surname.value,
			email: form.email.value,
			phoneNumber: form.phone.value,
			address: form.address.value,
			role: form.role.value,
		};
		editUser(updatedUser)
			.then(response => {
				setOpenUpdateDialog(false);
				setOpenSnackbar(true);
				setChange(!change);
			})
			.catch(error => console.error(error));
	};

	const handleResetPassword = user => {
		requestPasswordReset({ id: user.id })
			.then(response => {
				setOpenSnackbarPassword(true);
			})
			.catch(error => console.error(error));
	};

	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};

	const handleSnackbarPasswordClose = () => {
		setOpenSnackbarPassword(false);
	};

	const handleChangeDense = event => {
		setDense(event.target.checked);
	};

	const handleCheckboxChange = (event) => {
		const itemId = event.target.value;
		const isChecked = event.target.checked;
	
		if (isChecked) {
		  setCheckedItems([...checkedItems, itemId + selectedUser.email]);
		} else {
		  setCheckedItems(checkedItems.filter((id) => id !== itemId + selectedUser.email));
		}
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
									<Tooltip title='Create User'>
										<Button
											className={classes.button}
											size='small'
											variant='text'
											endIcon={<CreateIcon />}
											onClick={handleCreateDialogOpen}
										>
											Create User
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
								<UsersTableHead onClick={handleCreateDialogOpen} />
								<TableBody>
									{users.map(user => (
										<TableRow
											key={user.id}
											classes={{
												root: classes.tableRowRoot,
												selected: classes.tableRowSelected,
											}}
											hover
											role='checkbox'
											tabIndex={-1}
											sx={{ cursor: 'pointer' }}
										>
											<TableCell component='th' scope='row' padding='none'></TableCell>

											<TableCell align='left'>{user.firstName}</TableCell>
											<TableCell align='left'>{user.lastName}</TableCell>
											<TableCell align='left'>{user.email}</TableCell>
											<TableCell align='left'>{user.phoneNumber}</TableCell>
											<TableCell align='left'>{user.address}</TableCell>
											<TableCell align='left'>{user.role}</TableCell>
											<TableCell align='center'>
												<ButtonGroup variant='text' aria-label='text button group'>
													<Button
														title='Edit'
														size='small'
														className={`${classes.button}`}
														variant='outline'
														onClick={() => {
															handleUpdateDialogOpen(user);
														}}
													>
														<EditIcon></EditIcon>
													</Button>
													<Button
														size='small'
														title='Reset password'
														className={`${classes.button}`}
														variant='outline'
														onClick={() => {
															handleResetPassword(user);
														}}
													>
														<LockResetIcon></LockResetIcon>
													</Button>
													<Button
														title='Access List'
														size='small'
														className={`${classes.button}`}
														variant='outline'
														onClick={() => {
															handleAccessListDialogOpen(user);
														}}
													>
														<FormatListBulletedIcon></FormatListBulletedIcon>
													</Button>
												</ButtonGroup>
											</TableCell>
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
				<DialogTitle>Create User</DialogTitle>
				<DialogContent>
					<DialogContentText>Please fill out the form below to create a new user.</DialogContentText>
					<form onSubmit={handleCreateUser}>
						<TextField autoFocus margin='dense' name='name' label='Name' fullWidth />
						<TextField margin='dense' name='surname' label='Surname' fullWidth />
						<TextField margin='dense' name='email' label='Email' fullWidth />
						<TextField margin='dense' name='phone' label='Phone' fullWidth />
						<TextField margin='dense' name='address' label='Address' fullWidth />
						<FormControl fullWidth margin='dense'>
							<InputLabel>Role</InputLabel>
							<Select label='Role' name='role' defaultValue={'User'}>
								<MenuItem value='User'>User</MenuItem>
								<MenuItem value='Admin'>Admin</MenuItem>
								<MenuItem value='Restricted'>Restricted</MenuItem>
							</Select>
						</FormControl>
						<DialogActions>
							<Button onClick={handleCreateDialogClose} className={`${classes.button}`} variant='outline'>
								Cancel
							</Button>
							<Button type='submit' className={`${classes.button}`} variant='contained'>
								Create
							</Button>
						</DialogActions>
					</form>
				</DialogContent>
			</Dialog>
			<Dialog open={openUpdateDialog} onClose={handleUpdateDialogClose}>
				<DialogTitle>Update User</DialogTitle>
				<DialogContent>
					<DialogContentText>Please update the user information below.</DialogContentText>
					<form onSubmit={handleUpdateUser}>
						<TextField
							autoFocus
							margin='dense'
							name='name'
							label='Name'
							fullWidth
							defaultValue={selectedUser.firstName}
						/>
						<TextField margin='dense' name='surname' label='Surname' fullWidth defaultValue={selectedUser.lastName} />
						<TextField margin='dense' name='email' label='Email' fullWidth defaultValue={selectedUser.email} />
						<TextField margin='dense' name='phone' label='Phone' fullWidth defaultValue={selectedUser.phoneNumber} />
						<TextField margin='dense' name='address' label='Address' fullWidth defaultValue={selectedUser.address} />
						<FormControl fullWidth margin='dense'>
							<InputLabel>Role</InputLabel>
							<Select label='Role' name='role' defaultValue={selectedUser.role}>
								<MenuItem value='User'>User</MenuItem>
								<MenuItem value='Admin'>Admin</MenuItem>
								<MenuItem value='Restricted'>Restricted</MenuItem>
							</Select>
						</FormControl>
						<DialogActions>
							<Button onClick={handleUpdateDialogClose} className={`${classes.button}`} variant='outlinedo'>
								Cancel
							</Button>
							<Button type='submit' className={`${classes.button}`} variant='contained'>
								Save
							</Button>
						</DialogActions>
					</form>
				</DialogContent>
			</Dialog>

			<Dialog open={openAccessListDialog} onClose={handleAccessListDialogClose}>
				<DialogTitle>{selectedUser.name} {selectedUser.surname} Access List</DialogTitle>
				<DialogContent>
				<List>
					<FormGroup>
						<ListItem>
							<ListItemText primary="View account balance" />
							<FormControlLabel
							control={<Checkbox checked={checkedItems.includes('viewBalance' + selectedUser.email)} onChange={handleCheckboxChange} value="viewBalance" />}
							/>
						</ListItem>
						<ListItem>
							<ListItemText primary="View transaction history" />
							<FormControlLabel
							control={<Checkbox checked={checkedItems.includes('viewHistory' + selectedUser.email)} onChange={handleCheckboxChange} value="viewHistory" />}
							/>
						</ListItem>
						<ListItem>
							<ListItemText primary="Send payments" />
							<FormControlLabel
							control={<Checkbox checked={checkedItems.includes('sendPayments' + selectedUser.email)} onChange={handleCheckboxChange} value="sendPayments" />}
							/>
						</ListItem>
						<ListItem>
							<ListItemText primary="Receive payments" />
							<FormControlLabel
							control={<Checkbox checked={checkedItems.includes('receivePayments' + selectedUser.email)} onChange={handleCheckboxChange} value="receivePayments" />}
							/>
						</ListItem>
						<ListItem>
							<ListItemText primary="Edit profile information" />
							<FormControlLabel
							control={<Checkbox checked={checkedItems.includes('editProfile' + selectedUser.email)} onChange={handleCheckboxChange} value="editProfile" />}
							/>
						</ListItem>
						<ListItem>
							<ListItemText primary="Add or remove payment methods" />
							<FormControlLabel
							control={<Checkbox checked={checkedItems.includes('addRemovePayment' + selectedUser.email)} onChange={handleCheckboxChange} value="addRemovePayment" />}
							/>
						</ListItem>
						<ListItem>
							<ListItemText primary="Set up recurring payments" />
							<FormControlLabel
							control={<Checkbox checked={checkedItems.includes('recurringPayments' + selectedUser.email)} onChange={handleCheckboxChange} value="recurringPayments" />}
							/>
						</ListItem>
						<ListItem>
							<ListItemText primary="Cancel pending payments" />
							<FormControlLabel
							control={<Checkbox checked={checkedItems.includes('cancelPending' + selectedUser.email)} onChange={handleCheckboxChange} value="cancelPending" />}
							/>
						</ListItem>
					</FormGroup>
				</List>
					<DialogActions>
							<Button onClick={handleAccessListDialogClose} className={`${classes.button}`} variant='outlinedo'>
								Cancel
							</Button>
							<Button type='submit' onClick={handleAccessListUpdate} className={`${classes.button}`} variant='contained'>
								Save
							</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>

			<Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity='success'>
					User saved successfully!
				</Alert>
			</Snackbar>
			<Snackbar open={openSnackbarPassword} autoHideDuration={3000} onClose={handleSnackbarPasswordClose}>
				<Alert onClose={handleSnackbarPasswordClose} severity='success'>
					Email to reset password has been sent!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default UserManagement;
