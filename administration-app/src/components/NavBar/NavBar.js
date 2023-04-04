import { Link } from 'react-router-dom';
import cn from './css/NavBar.module.css';
import LogoutButton from '../Login/Logout';
import styled from 'styled-components';

export const NavBar = () => {
	const token = localStorage.getItem('token');
	const ActiveLink = styled(Link)`
		display: flex;
		margin: auto;
		align-items: center;
		height: 100%;
		padding: 5px;
		color: #333;
		text-decoration: none;
		transition: all 0.2s ease-in-out;
		border-radius: 15px;

		&:hover {
			background-color: #ddd000;
		}
	`;
	const nav_Links = {
		display: 'flex',
		listStyle: 'none',
		margin: 0,
		padding: 0,
	};
	const active = {
		display: 'flex',
		margin: 'auto',
		alignItems: 'center',
		height: '100%',
		padding: '5px',
		paddingRight: '15px',
		paddingLeft: '15px',
		color: '#333',
		textDecoration: 'none',
		transition: 'all 0.2s ease-in-out',
		borderRadius: '15px',
	};

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
