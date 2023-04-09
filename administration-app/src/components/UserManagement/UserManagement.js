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
} from '@mui/material';
import { Alert } from '@mui/material';

const UserManagement = () => {
	const [users, setUsers] = useState([]);
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
	const [selectedUser, setSelectedUser] = useState({});
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openSnackbarPassword, setOpenSnackbarPassword] = useState(false);
	const [change, setChange] = useState(false);
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

	return (
		<div>
			<Button variant='contained' onClick={handleCreateDialogOpen} sx={{ margin: '10px' }}>
				Create User
			</Button>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>First name</TableCell>
							<TableCell>Last name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Phone</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>Role</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user => (
							<TableRow key={user.id}>
								<TableCell>{user.firstName}</TableCell>
								<TableCell>{user.lastName}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.phoneNumber}</TableCell>
								<TableCell>{user.address}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>
									<IconButton onClick={() => handleUpdateDialogOpen(user)}>Edit</IconButton>
									<IconButton onClick={() => handleResetPassword(user)}>Reset password</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

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
							<Button onClick={handleCreateDialogClose}>Cancel</Button>
							<Button type='submit' variant='contained' color='primary'>
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
								<MenuItem value=''>No role</MenuItem>
							</Select>
						</FormControl>
						<DialogActions>
							<Button onClick={handleUpdateDialogClose}>Cancel</Button>
							<Button type='submit' variant='contained' color='primary'>
								Save
							</Button>
						</DialogActions>
					</form>
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
