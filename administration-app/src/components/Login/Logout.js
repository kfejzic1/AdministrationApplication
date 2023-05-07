import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { logout } from '../../services/userService';

const LogoutButton = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		logout().then(res => {
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
			localStorage.clear();
			navigate('/login');
		});
	};

	return (
		<Button variant='outlined' style={{ margin: 10 }} onClick={handleLogout}>
			Log out
		</Button>
	);
};

export default LogoutButton;
