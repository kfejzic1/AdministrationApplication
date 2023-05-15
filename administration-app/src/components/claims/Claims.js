import React, { useState, useEffect } from 'react';
// import AccountRequestsDialog from './AccountRequestsDialog';
import { getAllClaims, acceptClaim, solveClaim } from '../../services/claimService';
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
	TableRow,
	TableCell,
	TableBody,
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
import ClaimsTableHead from './ClaimsTableHead';
import { Stack } from '@mui/system';
import CreateIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MessageIcon from '@mui/icons-material/Message';
import DoneIcon from '@mui/icons-material/Done';
import data from './Claims.json';
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

const ClaimManagement = () => {
	const classes = useStyles();
	const [users, setUsers] = useState([]);
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
	const [openPendingRequestsDialog, setOpenPendingRequestsDialog] = useState(false);
	const [selectedUser, setSelectedUser] = useState({});
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openSnackbarPassword, setOpenSnackbarPassword] = useState(false);
	const [change, setChange] = useState(false);
	const [dense, setDense] = useState(false);

	// useEffect(() => {
	// 	getAllClaims().then(response => {
	// 		setUsers(
	// 			response.data.map(u => {
	// 				return {
	// 					id: u.result.user.id,
	// 					firstName: u.result.user.firstName,
	// 					lastName: u.result.user.lastName,
	// 					email: u.result.user.email,
	// 					phoneNumber: u.result.user.phoneNumber,
	// 					address: u.result.user.address,
	// 					role: u.result.userRole,
	// 				};
	// 			})
	// 		);
	// 	});
	// }, [change]);
	const handleCreateDialogOpen = () => {
		setOpenCreateDialog(true);
	};

	const handlePendingRequestsDialogOpen = () => {
		setOpenPendingRequestsDialog(true);
	};

	const handlePendingRequestsDialogClose = () => {
		setOpenPendingRequestsDialog(false);
	};
	const handleCreateDialogClose = () => {
		setOpenCreateDialog(false);
	};

	// const handleCreateUser = event => {
	// 	event.preventDefault();
	// 	const form = event.target;
	// 	const newUser = {
	// 		firstName: form.name.value,
	// 		lastName: form.surname.value,
	// 		email: form.email.value,
	// 		phoneNumber: form.phone.value,
	// 		address: form.address.value,
	// 		role: form.role.value,
	// 	};
	// 	createUser(newUser)
	// 		.then(response => {
	// 			setOpenCreateDialog(false);
	// 			setOpenSnackbar(true);
	// 			setChange(!change);
	// 		})
	// 		.catch(error => console.error(error));
	// };

	const handleUpdateDialogOpen = user => {
		setSelectedUser(user);
		setOpenUpdateDialog(true);
	};

	const handleUpdateDialogClose = () => {
		setSelectedUser({});
		setOpenUpdateDialog(false);
	};

	// const handleUpdateUser = event => {
	// 	event.preventDefault();
	// 	const form = event.target;
	// 	const updatedUser = {
	// 		id: selectedUser.id,
	// 		firstName: form.name.value,
	// 		lastName: form.surname.value,
	// 		email: form.email.value,
	// 		phoneNumber: form.phone.value,
	// 		address: form.address.value,
	// 		role: form.role.value,
	// 	};
	// 	editUser(updatedUser)
	// 		.then(response => {
	// 			setOpenUpdateDialog(false);
	// 			setOpenSnackbar(true);
	// 			setChange(!change);
	// 		})
	// 		.catch(error => console.error(error));
	// };

	// const handleResetPassword = user => {
	// 	requestPasswordReset({ id: user.id })
	// 		.then(response => {
	// 			setOpenSnackbarPassword(true);
	// 		})
	// 		.catch(error => console.error(error));
	// };

	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};

	const handleSnackbarPasswordClose = () => {
		setOpenSnackbarPassword(false);
	};

	const handleChangeDense = event => {
		setDense(event.target.checked);
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
									<Tooltip title='All claims'>
										<Button
											className={classes.button}
											size='small'
											variant='text'
											onClick={handleCreateDialogOpen}
										>
											All claims
										</Button>
									</Tooltip>
									<Tooltip title='My claims'>
										<Button
											className={classes.button}
											size='small'
											variant='text'
											onClick={handlePendingRequestsDialogOpen}
										>
											My claims
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
								<ClaimsTableHead onClick={handleCreateDialogOpen} />
								<TableBody>
									{data.map(claim => (
										<TableRow
											key={claim.TransactionID}
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

											<TableCell align='left'>{claim.claim.Subject}</TableCell>
											<TableCell align='left'>{claim.claim.Description}</TableCell>
											<TableCell align='left'>{claim.claim.Created}</TableCell>
											<TableCell align='left'>{claim.claim.CreatedBy}</TableCell>
											<TableCell align='left'>{claim.claim.Status}</TableCell>
											<TableCell align='center'>
												<ButtonGroup variant='text' aria-label='text button group'>
													<Button
														title='Dome'
														size='small'
														className={`${classes.button}`}
														variant='outline'
														onClick={() => {
															handleUpdateDialogOpen(claim);
														}}
													>
														<DoneIcon></DoneIcon>
													</Button>
													<Button
														size='small'
														title='Message'
														className={`${classes.button}`}
														variant='outline'
														onClick={() => {
															// handleResetPassword(claim);
														}}
													>
														<MessageIcon></MessageIcon>
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
        </div>
    );
};

export default ClaimManagement;