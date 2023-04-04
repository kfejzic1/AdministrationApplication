import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert, LinearProgress } from '@mui/material';
import { findCustomerById, editCustomer, requestPasswordReset } from '../../services/customerManagementService';
import { useParams } from 'react-router-dom';

//role
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
//

export const CustomerEdit = () => {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [errors, setErrors] = useState({});
	const [email, setEmail] = useState('');
	const [open, setOpen] = useState(false);
	const { id } = useParams();
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [role, setRole] = useState(1);
	useEffect(() => {
		findCustomerById(id)
			.then(response => {
				const customerData = response.data;
				setName(customerData.firstName);
				setSurname(customerData.lastName);
				setEmail(customerData.email);
				setPhoneNumber(customerData.phoneNumber);
				setRole(parseInt(customerData.role));
			})
			.catch(error => {
				console.log(id);
				console.error(error);
				setErrorMessage('Failed to retrieve user data');
			});
	}, [id]);

	if (id == null) {
		return (
			<Alert variant='filled' severity='error'>
				Missing id in query parameters.
			</Alert>
		);
	}

	const validate = () => {
		const newErrors = {};
		if (!/^[a-zA-Z]+$/.test(name)) {
			newErrors.name = 'Name can only contain alphabetic characters';
		}
		if (!/^[a-zA-Z]+$/.test(surname)) {
			newErrors.surname = 'Surname can only contain alphabetic characters';
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Email is not in a valid format';
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
		let validData = validate();

		if (validData) {
			const editUserRequest = {
				id: id,
				firstName: name,
				lastName: surname,
				email: email,
				phoneNumber: phoneNumber,
				role: parseInt(role),
			};
			setOpen(true);
			editCustomer(editUserRequest)
				.then(() => {
					setOpen(false);
					setSuccessMessage('User profile has been updated.');
				})
				.catch(error => {
					setOpen(false);
					setErrorMessage('Failed to update user profile');
					console.error(error);
				});
		}
	};

	const handlePasswordReset = () => {
		setErrorMessage('');
		setSuccessMessage('');
		setOpen(true);
		requestPasswordReset({ id: id })
			.then(() => {
				setOpen(false);
				setSuccessMessage('Password reset email has been sent');
			})
			.catch(error => {
				setOpen(false);
				setErrorMessage('Failed to send password reset email');
			});
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100vh' }}>
			<form onSubmit={handleSubmit} style={{ width: '30%', marginTop: '5vh' }}>
				<h1 style={{ textAlign: 'center' }}>Edit customer</h1>
				<TextField
					label='Name'
					name='name'
					variant='standard'
					sx={{ width: '100%' }}
					value={name}
					onChange={event => setName(event.target.value)}
					error={errors.name !== undefined}
					helperText={errors.name}
				/>
				<br />
				<TextField
					label='Surname'
					name='surname'
					variant='standard'
					sx={{ width: '100%' }}
					value={surname}
					onChange={event => setSurname(event.target.value)}
					error={errors.surname !== undefined}
					helperText={errors.surname}
				/>
				<br />
				<TextField
					label='Email'
					name='email'
					variant='standard'
					sx={{ width: '100%' }}
					value={email}
					onChange={event => setEmail(event.target.value)}
					error={errors.email !== undefined}
					helperText={errors.email}
				/>
				<br />
				<TextField
					label='Phone number'
					name='phoneNumber'
					variant='standard'
					sx={{ width: '100%' }}
					value={phoneNumber}
					onChange={event => setPhoneNumber(event.target.value)}
				/>
				<br />
				<FormControl sx={{ marginTop: '10px' }}>
					<FormLabel id='role-row-radio-buttons-group-label'>Role</FormLabel>
					<RadioGroup
						row
						aria-labelledby='role-row-radio-buttons-group-label'
						name='role-row-radio-buttons-group'
						value={role}
						onChange={event => setRole(event.target.value)}
					>
						<FormControlLabel value='0' control={<Radio />} label='Admin' />
						<FormControlLabel value='1' control={<Radio />} label='Standard' />
						<FormControlLabel value='2' control={<Radio />} label='Restricted' />
					</RadioGroup>
				</FormControl>
				<br />
				<Button
					type='submit'
					variant='contained'
					sx={{ width: '100%', marginTop: '20px', background: '#FFC120', '&:hover': { background: '#DAA520' } }}
				>
					Update
				</Button>
				<br />
				<Button
					type='button'
					variant='contained'
					sx={{ width: '100%', marginTop: '20px', background: '#FFC120', '&:hover': { background: '#DAA520' } }}
					onClick={handlePasswordReset}
				>
					Reset password
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
