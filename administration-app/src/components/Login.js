import React, { useState } from 'react';
import './Login.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/loginServices';
import { Button, Typography, TextField, Input, Alert } from '@mui/material';
import { GoogleLoginButton, FacebookLoginButton, MicrosoftLoginButton } from "react-social-login-buttons"

const LoginForm = arg => {
	const [phoneMail, setPhoneMail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	function checkData(input) {
		const regex = new RegExp('^[0-9]+$');
		if (input.length <= 10 && input.match(regex)) return 'phone';
		else return 'email';
	}

	function LoginAlert() {
		if (errorMessage.length > 0)
			return <Alert style={{width: '80%'}} severity='error' variant='filled'>
						{errorMessage}
					</Alert>;
		return;
	}

	const handleButtonClick = () => {
		// if (checkData(email) === 'email') {
		// 	arg.setEmail(email);
		// 	loginFunction(email, password)
		// 		.then(res => {
		// 			setErrorMessage('');
		// 			const email1 = email;
		// 			console.log(email1);
		// 		})
		// 		.catch(err => {
		// 			setErrorMessage('Neuspješna prijava!');
		// 		});
		// } else {
		// 	arg.setEmail(email);
		// 	loginFunction(email, password)
		// 		.then(res => {
		// 			setErrorMessage('');
		// 			const { token } = res.data;
		// 			localStorage.setItem('token', token);
		// 			const email1 = email;
		// 			console.log(email1);
		// 			navigate('/twofactor');
		// 		})
		// 		.catch(err => {
		// 			setErrorMessage('Neuspješna prijava!');
		// 		});
		// }
		const loginData = {
			[checkData(phoneMail)]: phoneMail,
			password,
		};

		login(loginData)
			.then(res => {
				const { token } = res.data;

				if (!token) {
					navigate('/twofactor');
					return;
				}

				localStorage.setItem('token', token);
			})
			.catch(err => {
				setErrorMessage('Neuspješna prijava!');
			});
	};

	return (
		<div className='login-container'>
			<div className='cover'>
				<Typography variant='h4'>Login</Typography>
				<LoginAlert/>
				<Input
					className='user-data'
					type='text'
					placeholder='E-mail or Phone number'
					onChange={e => {
						setPhoneMail(e.target.value);
					}}
				/>
				<Input
					className='user-data'
					type='password'
					placeholder='Password'
					onChange={e => {
						setPassword(e.target.value);
					}}
				/>
				<GoogleLoginButton style={{width: '80%'}}/>
				<FacebookLoginButton style={{width: '80%'}}/>
				<MicrosoftLoginButton style={{width: '80%'}}/>

				<Typography>
					You are not registered? <a href='/'>Register</a>
				</Typography>
				<button className='login-btn' onClick={handleButtonClick}>
					{' '}
					Login
				</button>
			</div>
		</div>
	);
};

export default LoginForm;
