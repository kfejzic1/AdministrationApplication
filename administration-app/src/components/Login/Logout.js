import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const LogoutButton = () => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.clear();
		navigate('/login');
	};
	return (
		<Button variant='outlined' onClick={logout}>
			Log out
		</Button>
	);
};

export default LogoutButton;
