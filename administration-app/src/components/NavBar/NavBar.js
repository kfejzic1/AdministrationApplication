import { Link } from 'react-router-dom';
import LogoutButton from '../Login/Logout';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export const NavBar = props => {
	useEffect(() => {
		props.setToken(localStorage.getItem('token'));
	}, []);

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
					<Button component={Link} to='/user-management' color='primary'>
						User management
					</Button>
					<Button component={Link} to='/currencies' color='primary'>
						Currencies
					</Button>
					<Button component={Link} to='/redeem-voucher' color='primary'>
						Redeem Voucher
					</Button>
					<Button component={Link} to='/claims' color='primary'>
						Claims
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
