import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../Login/Logout';
import { useState, useEffect } from 'react';
import { Avatar, Box, AppBar, Toolbar, Typography, Button, Tooltip, IconButton, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getValidateToken } from '../../services/userService';
import { logout } from '../../services/userService';
import Logout from '@mui/icons-material/Logout';

export const NavBar = props => {
	const [openAccounts, setOpenAccounts] = useState(false);
	const [openInvoices, setOpenInvoices] = useState(false);
	const [openTransactions, setOpenTransactions] = useState(false);
	const [user, setUser] = useState('');
	const [anchorElAcc, setAnchorElAcc] = useState();
	const [anchorElInv, setAnchorElInv] = useState();
	const [anchorElTrans, setAnchorElTrans] = useState();
	const navigate = useNavigate();
	
	useEffect(() => {
		props.setToken(localStorage.getItem('token'));
	}, []);

	useEffect(() => {
		getValidateToken(localStorage.getItem('token')).then(response => {
			setUser(response.data);
		});
	}, []);

	const accountClicked = (event) => {
		setOpenAccounts(true);
		setAnchorElAcc(event.currentTarget);
	}

	const invoicesClicked = (event) => {
		setOpenInvoices(true);
		setAnchorElInv(event.currentTarget);
	}

	const transactionsClicked = (event) => {
		setOpenTransactions(true);
		setAnchorElTrans(event.currentTarget);
	}

	const gotoTransactions = () => {
		closeTransactions();
		navigate('/transactions');
	}

	const gotoPayment = () => {
		closeTransactions();
		navigate('/payment');
	}

	const gotoClaims = () => {
		closeTransactions();
		navigate('/claims');
	}

	const gotoMyInvoices = () => {
		closeInvoices();
		navigate('/myinvoices');
	}

	const gotoRegisterInv = () => {
		closeInvoices();
		navigate('/register-eInvoice');
	}

	const gotoEinvoiceData = () => {
		closeInvoices();
		navigate('/einovicedata');
	}

	const gotoEinvoiceApprove = () => {
		closeInvoices();
		navigate('/einoviceapprove');
	}

	const closeAccount = () => {
		setOpenAccounts(false);
	}

	const closeInvoices = () => {
		setOpenInvoices(false);
	}

	const closeTransactions = () => {
		setOpenTransactions(false);
	}

	const handleLogout = () => {
		closeAccount();
		logout().then(res => {
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
			localStorage.clear();
			navigate('/login');
		});
	};

	const gotoUser = () => {
		closeAccount();
		navigate('/user');
	}

	const goHome = () => {
		navigate('/');
	}

	const userAdmin = () => {
		if (user.roles) {
			var b = user.roles.filter(v => v === 'Admin')[0];
			if (b === 'Admin') {
				//console.log("Uslo u ovu funkciju");
				return true;
			}
			return false;
		}
		return false;
	};

	return (
		<AppBar position='static' sx={{ backgroundImage: 'linear-gradient(180deg, #ffb649 35%,#ffdd00)' }}>
			{props.token ? (
				<Toolbar>
					<Typography onClick={goHome} variant='h6' sx={{ flexGrow: 1, color: '#000' }}>
						Digipay
					</Typography>
					<Button sx={{color: 'black'}} component={Link} to='/' color='primary'>
						Home
					</Button>
					<Button sx={{color: 'black'}} component={Link} to='/vendor-management' color='primary'>
						Vendor management
					</Button>
					{props.isAdmin && (
						<Button sx={{color: 'black'}} component={Link} to='/user-management' color='primary'>
							User management
						</Button>
					)}
					<Button sx={{color: 'black'}} component={Link} to='/currencies' color='primary'>
						Currencies
					</Button>
					{
						props.isAdmin ? 
						(<Button sx={{color: 'black'}} component={Link} to='/voucher' color='primary'>
							Voucher
						</Button>) 
						: 
						(<Button sx={{color: 'black'}} component={Link} to='/redeem-voucher' color='primary'>
							Redeem Voucher
						</Button>)
						
					}
					

					<Box>
						<Tooltip title="Transactions"  onClick={transactionsClicked}>
							<Button 
								sx={{color: 'black'}}
								endIcon={<KeyboardArrowDownIcon />}
								aria-controls={openTransactions ? 'invoice-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={openTransactions ? 'true' : undefined}
							>
								Transactions
							</Button>
						</Tooltip>

						<Menu
							id="transactions-menu"
							anchorEl={anchorElTrans}
							open={openTransactions}
							onClose={closeTransactions}
							PaperProps={{
							elevation: 0,
							sx: {
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
								mt: 1.5,
								'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
								},
								'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
								},
							},
							}}
							transformOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						>
							<MenuItem onClick={gotoTransactions}>
								Transaction list
							</MenuItem>
							<MenuItem onClick={gotoPayment}>
								Payment
							</MenuItem>
							{props.isAdmin && (
								<MenuItem onClick={gotoClaims}>
									Claims
								</MenuItem>
							)}
						</Menu>
					</Box>
					
					<Box>
						<Tooltip title="E-Invoices"  onClick={invoicesClicked}>
							<Button 
								sx={{color: 'black'}}
								endIcon={<KeyboardArrowDownIcon />}
								aria-controls={openInvoices ? 'invoice-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={openInvoices ? 'true' : undefined}
							>
								Invoices
							</Button>
						</Tooltip>

						<Menu
							id="invoice-menu"
							anchorEl={anchorElInv}
							open={openInvoices}
							onClose={closeInvoices}
							PaperProps={{
							elevation: 0,
							sx: {
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
								mt: 1.5,
								'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
								},
								'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
								},
							},
							}}
							transformOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						>
							<MenuItem onClick={gotoMyInvoices}>
								My Invoices
							</MenuItem>
							<MenuItem onClick={gotoRegisterInv}>
								Register for E-Invoice
							</MenuItem>
							{
								props.isAdmin ? (
									<MenuItem onClick={gotoEinvoiceData}>
										E-invoice data
									</MenuItem>
								) : null
							}
							{
								props.isAdmin ? (
									<MenuItem onClick={gotoEinvoiceApprove}>
										E-invoice approval
									</MenuItem>
								) : null
							}
						</Menu>
					</Box>

					<Box>
						<Tooltip title="Account" onClick={accountClicked}>
							<IconButton
								size="small"
								sx={{ ml: 2 }}
								aria-controls={openAccounts ? 'account-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={openAccounts ? 'true' : undefined}
							>
								<Avatar sx={{ width: 32, height: 32, color: 'white', backgroundColor: '#2f2f2f' }}>{user ? user.username[0] : '?'}</Avatar>
							</IconButton>
						</Tooltip>
						<Menu
							id="account-menu"
							anchorEl={anchorElAcc}
							open={openAccounts}
							onClose={closeAccount}
							PaperProps={{
							elevation: 0,
							sx: {
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
								mt: 1.5,
								'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
								},
								'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
								},
							},
							}}
							transformOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						>
							<MenuItem onClick={gotoUser}>
								<Avatar /> Profile
							</MenuItem>
							<MenuItem onClick={handleLogout}>
								<Logout sx={{mr: 1}}/> Log out
							</MenuItem>
							
						</Menu>
					</Box>
					
				</Toolbar>
			) : (
				<Toolbar>
					<Typography onClick={goHome} variant='h6' sx={{ flexGrow: 1, color: '#000' }}>
						Digipay
					</Typography>

					<Button sx={{color: 'black'}} component={Link} to='/' color='primary'>
						Home
					</Button>
					<Button sx={{color: 'black'}} component={Link} to='/login' color='primary'>
						Login
					</Button>
				</Toolbar>
			)}
		</AppBar>
	);
};
