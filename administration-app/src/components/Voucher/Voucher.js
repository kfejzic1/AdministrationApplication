import React, { useState, useEffect } from 'react';
import { createUser, editUser, getAllUsers, requestPasswordReset } from '../../services/userManagementService';

import { getAllCurrencies, getAllVouchers, createVoucher, changeVoucherStatus } from '../../services/voucher';

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
import VoucherTableHead from './VoucherTableHead';
import { Stack } from '@mui/system';
import CreateIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RedeemIcon from '@mui/icons-material/Redeem';
import EditIcon from '@mui/icons-material/Edit';
import SellIcon from '@mui/icons-material/Sell';

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

const Voucher = () => {
	const classes = useStyles();
	const [vouchers, setVouchers] = useState([]);
	const [currencys, setCurrecys] = useState([]);
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
	const [selectedUser, setSelectedUser] = useState({});
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openSnackbarVoucher, setOpenSnackbarVoucher] = useState(false);
	const [openSnackbarVoucherVoid, setOpenSnackbarVoucherVoid] = useState(false);
	const [change, setChange] = useState(false);
	const [dense, setDense] = useState(false);

	useEffect(() => {
		getAllVouchers().then(response => {
			setVouchers(
				response.data.map(u => {
					return {
						id: u.id,
						amount: u.amount,
						currencyId: u.currencyId,
						code: u.code,
						voucherStatusId: u.voucherStatusId,
					};
				})
			);
		});
	}, [change]);

	useEffect(() => {
		getAllCurrencies().then(response => {
			setCurrecys(response.data);
		})
	}, []);

	const handleCreateDialogOpen = () => {
		setOpenCreateDialog(true);
	};

	const handleCreateDialogClose = () => {
		setOpenCreateDialog(false);
	};

	const handleCreateVoucher = event => {

		event.preventDefault();
		const form = event.target;
		var noVoucher1 = form.NumberOfVouchers.value;
		var noVoucherNumber = noVoucher1 * 1;
		var amou = form.amount.value;
		var amountNumber = amou* 1;
		var string1 = form.currency.value;
		var b = currencys.filter(v => v.name == string1)[0];
		console.log("bbb ", b.id);
		createVoucher(noVoucherNumber,amountNumber,b.id).then(response => {
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

	const handleSnackbarVoucherClose = () => {
		setOpenSnackbarVoucher(false);
	};

	const handleSnackbarVoucherVoidClose = () => {
		setOpenSnackbarVoucherVoid(false);
	};

	const handleVoidVoucher = voucher => {
		var b = "4";
		changeVoucherStatus({ code: voucher.code , statusId: b}).then(response => {
			setOpenSnackbarVoucherVoid(true);
			setChange(!change);
		})
		.catch(error => console.error(error));
	}


	const handleRedeemVoucher = voucher => {
		console.log("Voucher ovdje kad se pozve je " + JSON.stringify(voucher));
		var b = returnStatus(voucher.voucherStatusId);	
		changeVoucherStatus({ code: voucher.code , statusId: b}).then(response => {
			setOpenSnackbarVoucher(true);
			setChange(!change);
		})
		.catch(error => console.error(error));
	};

	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};

	const handleChangeDense = event => {
		setDense(event.target.checked);
	};

	const returnStatus = (a) => {
		if (a === "1")
		 	return "2";
		else if (a === "2")
		 	return "3";
		else if (a === "3")
			return "4";
		return "1";
	}

	const statusV = (a) => {
		/*new VoucherStatus { Id = "1", Status = "ISSUED" },
                   new VoucherStatus { Id = "2", Status = "ACTIVE" },
                   new VoucherStatus { Id = "3", Status = "REDEEMED" },
                   new VoucherStatus { Id = "4", Status = "VOID" }*/
		if(a === '1') return "ISSUED";
		else if(a === '2') return "ACTIVE";
		else if(a === '3') return "REDEEMED";
		else if( a === '4') return "VOID";
		return "INVALID STATUS";
	} 
	const currencyV = (a) => {
		var b=currencys.filter(v => v.id===a)[0]
		if(b)
		return b.name;
		else return "BAM";	
	}

	const isTrueSt = (a) => {
		if(a === "REDEEMED" || a === "ISSUED" || a ==="VOID") return true;
		else return false
	} 
	const is1or2 = (a) => {
		if( a === "1" || a === "2") return true;
		return false;

	}
	
	return (
		<div>
			<Box sx={{ width: '95%', margin: 'auto', pt: '15px', mt: '15px' }}>
				<Paper sx={{ width: '100%', mb: 2, border: 'none' }}>
					<ThemeProvider theme={tableTheme}>
						<TableContainer>
							<Toolbar sx={{ justifyContent: 'space-between' }}>
								<div></div>
								<Stack direction='row'>
									<Tooltip title='Create Voucher'>
										<Button
											className={classes.button}
											size='small'
											variant='text'
											endIcon={<CreateIcon />}
											onClick={handleCreateDialogOpen}
										>
											Create Voucher
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
								<VoucherTableHead onClick={handleCreateDialogOpen} />
								<TableBody>
									{vouchers.map(voucher => (
										<TableRow
											key={voucher.id}
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
											<TableCell align='left'>{voucher.code}</TableCell>
											<TableCell align='left'>{voucher.amount}</TableCell>
											<TableCell align='left'>{currencyV(voucher.currencyId)}</TableCell>
											<TableCell align='left'>{statusV(voucher.voucherStatusId)}</TableCell>
											<TableCell align='center'>
												<ButtonGroup variant='text' aria-label='text button group'>
													<Button
														title='Edit'
														size='small'
														className={`${classes.button}`}
														variant='outline'
														onClick={() => {
															handleUpdateDialogOpen(voucher);
														}}
													>
														<EditIcon></EditIcon>
													</Button>
													{isTrueSt(statusV(voucher.voucherStatusId))?(
															<Button
															size='small'
															variant='outline'
															className={`${classes.button}`}															
														>
														<RedeemIcon style={{ visibility: 'hidden' }} />
														</Button>
													):(
													<Button
														size='small'
														title='Redeem code'
														className={`${classes.button}`}
														variant='outline'
														onClick={() => {
															handleRedeemVoucher(voucher);
														}}
													>
														<RedeemIcon></RedeemIcon>
													</Button>
													)}
													{is1or2(voucher.voucherStatusId)?(
													<Button
														size='small'
														title='Void vaucher'
														className={`${classes.button}`}
														variant='outline'
														onClick={() => {
															handleVoidVoucher(voucher);
														}}
													>
														<SellIcon></SellIcon>
													</Button>
													):(
														<Button
														size='small'
														className={`${classes.button}`}
														variant='outline'														
													>
														<SellIcon style={{ visibility: 'hidden' }} />
													</Button>
													)}													
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
				<DialogTitle>Create Voucher</DialogTitle>
				<DialogContent>
					<DialogContentText>Please fill out the form below to create a new voucher.</DialogContentText>
					<form onSubmit={handleCreateVoucher}>
						<TextField autoFocus margin='dense' name='NumberOfVouchers' label='Number of vouchers' fullWidth />
						<FormControl fullWidth margin='dense'>
							<InputLabel>Amount</InputLabel>
							<Select label='Amount' name='amount' defaultValue={10}>
								<MenuItem value='10'>10</MenuItem>
								<MenuItem value='20'>20</MenuItem>
								<MenuItem value='50'>50</MenuItem>
                                <MenuItem value='100'>100</MenuItem>
                                <MenuItem value='200'>200</MenuItem>
							</Select>
						</FormControl>
                        <FormControl fullWidth margin='dense'>
							<InputLabel>Currency</InputLabel>
							<Select label='Currency' name='currency' defaultValue={'BAM'}>
								{currencys.map(curr => (
									<MenuItem value={curr.name}>{curr.name}</MenuItem>
								)
								)}

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


			<Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity='success'>
					Voucher created successfully!
				</Alert>
			</Snackbar>

			<Snackbar open={openSnackbarVoucher} autoHideDuration={3000} onClose={handleSnackbarVoucherClose}>
				<Alert onClose={handleSnackbarVoucherClose} severity='success'>
					Voucher has been redeemed!
				</Alert>
			</Snackbar>

			<Snackbar open={openSnackbarVoucherVoid} autoHideDuration={3000} onClose={handleSnackbarVoucherVoidClose}>
				<Alert onClose={handleSnackbarVoucherVoidClose} severity='success'>
					Voucher is changed to void!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Voucher;
