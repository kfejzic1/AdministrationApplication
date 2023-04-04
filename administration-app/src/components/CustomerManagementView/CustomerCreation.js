import { LinearProgress, Alert, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { createCustomer } from '../../services/customerManagementService';
export const CustomerCreation = () => {
	const user = {
		firstname: '',
		lastname: '',
		email: '',
		phoneNumber: '',
	};
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [errors, setErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [open, setOpen] = useState(false);
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
		setErrors({});
		setErrorMessage('');
		setSuccessMessage('');
		let validData = validate();
		if (validData) {
			user.firstname = name;
			user.lastname = surname;
			user.email = email;
			user.phoneNumber = phoneNumber;

			setOpen(true);
			createCustomer(user)
				.then(() => {
					setOpen(false);
					setSuccessMessage('User created successfully');
					setName('');
					setSurname('');
					setEmail('');
					setPhoneNumber('');
					setErrors({});
				})
				.catch(error => {
					setOpen(false);
					setErrorMessage('Failed to create user');
					console.error(error);
				});
		}
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100vh' }}>
			<form onSubmit={handleSubmit} style={{ width: '30%', marginTop: '10vh', justifyContent: 'center' }}>
				<h1 style={{ textAlign: 'center' }}>Create new customer</h1>
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
				<Button
					type='submit'
					variant='contained'
					sx={{ width: '100%', background: '#FFC120', '&:hover': { background: '#DAA520' }, marginTop: '20px' }}
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
