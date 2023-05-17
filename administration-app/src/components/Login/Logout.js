import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, Avatar } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
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
		<Button onClick={handleLogout}>
			Log out
		</Button>
	);
};

export default LogoutButton;