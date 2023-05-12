import React, { useState, useEffect } from 'react';
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
import { Stack } from '@mui/system';
import CreateIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RedeemIcon from '@mui/icons-material/Redeem';
import EditIcon from '@mui/icons-material/Edit';
import SellIcon from '@mui/icons-material/Sell';
import { TablePagination } from '@mui/material';
import { getValidateToken } from '../../services/userService';
import { addPositionPropertiesToSections } from '@mui/x-date-pickers/internals';


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
	const [selectedVoucher, setSelectedVoucher] = useState({});
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openSnackbarVoucher, setOpenSnackbarVoucher] = useState(false);
	const [openSnackbarVoucherVoid, setOpenSnackbarVoucherVoid] = useState(false);
	const [change, setChange] = useState(false);
	const [dense, setDense] = useState(false);
	const [page, setPage] = useState(0);
	const [user, setUser] = useState("");
	const [rowsPerPage, setRowsPerPage] = useState(5);



	const handleCreateDialogClose = () => {
		setOpenCreateDialog(false);
	};

	const handleRegister = event => {
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



	const handleUpdateDialogOpen = voucher => {
		setSelectedVoucher(voucher);
		setOpenUpdateDialog(true);
	};

	const handleUpdateDialogClose = () => {
		setSelectedVoucher({});
		setOpenUpdateDialog(false);
	};

	const handleSnackbarVoucherClose = () => {
		setOpenSnackbarVoucher(false);
	};

	const handleSnackbarVoucherVoidClose = () => {
		setOpenSnackbarVoucherVoid(false);
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


	
	
	return (
		<div>				
			
				<DialogTitle>Register for electronic invoices</DialogTitle>
				<DialogContent>
					<DialogContentText>Please fill out the form below to register for electronic invoices.</DialogContentText>
					<form onSubmit={handleRegister}>
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
