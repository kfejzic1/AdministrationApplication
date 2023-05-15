import { Link } from 'react-router-dom';
import LogoutButton from '../Login/Logout';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { getValidateToken } from '../../services/userService';
export const NavBar = props => {
	const [user, setUser] = useState('');
	useEffect(() => {
		props.setToken(localStorage.getItem('token'));
	}, []);

	useEffect(() => {
		getValidateToken(localStorage.getItem('token')).then(response => {
			setUser(response.data);
		});
	}, []);

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
		<AppBar position='static' sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
			{props.token ? (
				<Toolbar>
					<Typography variant='h6' sx={{ flexGrow: 1, color: '#000' }}>
						Payment App
					</Typography>
					<Button component={Link} to='/' color='primary'>
						Home
					</Button>
					{props.isAdmin ? (
						<Button component={Link} to='/einoviceapprove' color='primary'>
							Einovice approve
						</Button>
					) : null}
					{props.isAdmin ? (
						<Button component={Link} to='/voucher' color='primary'>
							Voucher
						</Button>
					) : (
						<h1></h1>
					)}
					{props.isAdmin ? (
						<Button component={Link} to='/einovicedata' color='primary'>
							Einovice data
						</Button>
					) : null}
					<Button component={Link} to='/transactions' color='primary'>
						Transactions
					</Button>
					<Button component={Link} to='/payment' color='primary'>
						Payment
					</Button>
					<Button component={Link} to='/user' color='primary'>
						User
					</Button>
					<Button component={Link} to='/vendor-management' color='primary'>
						Vendor management
					</Button>
					{props.isAdmin && (
						<Button component={Link} to='/user-management' color='primary'>
							User management
						</Button>
					)}
					<Button component={Link} to='/currencies' color='primary'>
						Currencies
					</Button>
					<Button component={Link} to='/redeem-voucher' color='primary'>
						Redeem Voucher
					</Button>
					{props.isAdmin && (
						<Button component={Link} to='/claims' color='primary'>
							Claims
						</Button>
					)}
					<Button component={Link} to='/register-eInvoice' color='primary' style={{ border: '0.5px solid blue' }}>
						Registering for e-invoice
					</Button>
					<Button component={Link} to='/myinvoices' color='primary'>
						My invoices
					</Button>
					<LogoutButton />
				</Toolbar>
			) : (
				<Toolbar>
					<Typography variant='h6' sx={{ flexGrow: 1, color: '#000' }}>
						Payment App
					</Typography>

					<Button component={Link} to='/' color='primary'>
						Home
					</Button>
					<Button component={Link} to='/login' color='primary'>
						Login
					</Button>
				</Toolbar>
			)}
		</AppBar>
	);
};
