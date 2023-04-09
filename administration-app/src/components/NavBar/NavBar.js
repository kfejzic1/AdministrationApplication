import { Link } from 'react-router-dom';
import LogoutButton from '../Login/Logout';
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export const NavBar = props => {
	useEffect(() => {
		props.setToken(localStorage.getItem('token'));
	}, []);

	return (
		<div>
			<nav className={cn.nav_bar}>
				<div className={cn.nav_logo}>Payment App</div>

				{token ? ( //if user logged in,show all optons, else show only login option,
					<ul style={nav_Links}>
						<li>
							<ActiveLink to='/' style={active}>
								Home
							</ActiveLink>
						</li>
						<li>
							<ActiveLink to='/transactions' style={active}>
								Transactions
							</ActiveLink>
						</li>
						<li>
							<ActiveLink to='/payment' style={active}>
								Pay
							</ActiveLink>
						</li>

						<li>
							<ActiveLink to='/user' style={active}>
								User
							</ActiveLink>
						</li>
						<li>
							<ActiveLink to='/vendor-management' style={active}>
								Vendor management
							</ActiveLink>
						</li>
						<li>
							<ActiveLink to='/user-management' style={active}>
								User management
							</ActiveLink>
						</li>
						<li>
							<LogoutButton />
						</li>
					</ul>
				) : (
					<ul style={nav_Links}>
						<li>
							<ActiveLink to='/' style={active}>
								Home
							</ActiveLink>
						</li>
						<li>
							<ActiveLink to='/login' style={active}>
								LogIn
							</ActiveLink>
						</li>
					</ul>
				)}
			</nav>
		</div>
	);
};
