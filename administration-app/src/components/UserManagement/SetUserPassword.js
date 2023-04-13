import React, { useState } from 'react';
import { LinearProgress, Alert, TextField, Button } from '@mui/material';
import { setUserPassword, resetUserPassword } from '../../services/userManagementService';
import { useLocation } from 'react-router-dom';
export const SetUserPassword = props => {
	const setPasswordRequest = {
		id: '',
		token: '',
		password: '',
	};
	const [password, setPassword] = useState('');
	const [passwordAgain, setPasswordAgain] = useState('');
	const [errors, setErrors] = useState({});
	const [open, setOpen] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6,}$/;
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const id = params.get('id');
	const token = params.get('token');

	if (!id || !token) {
		return (
			<Alert variant='filled' severity='error'>
				Missing id or token in query parameters.
			</Alert>
		);
	}

	const validate = () => {
		const newErrors = {};

		if (!passwordRegex.test(password)) {
			newErrors.passwordError =
				'Password must be at least six characters long and contain an uppercase character, lowercase character, a digit and a non-alphanumeric character.';
		}
		if (password !== passwordAgain) {
			newErrors.passwordAgainError = 'Passwords do not match.';
		}
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return false;
		} else {
			return true;
		}
	};
	const handleSubmit = event => {
		event.preventDefault();
		setErrors({});
		setErrorMessage('');
		setSuccessMessage('');
		let validData = validate();
		if (validData) {
			setPasswordRequest.id = id;
			setPasswordRequest.token = token;
			setPasswordRequest.password = password;
			setOpen(true);
			if (props.reset) {
				resetUserPassword(setPasswordRequest)
					.then(() => {
						setOpen(false);
						setSuccessMessage('Your new password has been set.');
					})
					.catch(error => {
						setOpen(false);
						setErrorMessage('Failed to set your new password');
						console.error(error.da);
					});
			} else {
				setUserPassword(setPasswordRequest)
					.then(() => {
						setOpen(false);
						setSuccessMessage('Your new password has been set.');
					})
					.catch(error => {
						setOpen(false);
						setErrorMessage('Failed to set your new password');
						console.error(error);
					});
			}
		}
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100vh' }}>
			<form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
				<h1>Set your new password</h1>
				<TextField
					type='password'
					label='Password'
					value={password}
					onChange={event => setPassword(event.target.value)}
					error={errors.passwordError !== undefined}
					helperText={errors.passwordError}
					variant='standard'
					sx={{ width: '100%' }}
				/>
				<br></br>
				<TextField
					type='password'
					label='Confirm password'
					value={passwordAgain}
					onChange={event => setPasswordAgain(event.target.value)}
					error={errors.passwordAgainError !== undefined}
					helperText={errors.passwordAgainError}
					variant='standard'
					sx={{ width: '100%' }}
				/>
				<br></br>
				<Button
					type='submit'
					variant='contained'
					sx={{ width: '100%', marginTop: '20px', background: '#FFC120', '&:hover': { background: '#DAA520' } }}
				>
					Submit
				</Button>
				{open && <LinearProgress sx={{ marginTop: 10 }} />}
				{successMessage !== '' && (
					<Alert variant='filled' sx={{ marginTop: 10 }} severity='success' onClose={() => setSuccessMessage('')}>
						{successMessage}
					</Alert>
				)}
				{errorMessage !== '' && (
					<Alert variant='filled' sx={{ marginTop: 10 }} severity='error' onClose={() => setErrorMessage('')}>
						{errorMessage}
					</Alert>
				)}
			</form>
		</div>
	);
};
