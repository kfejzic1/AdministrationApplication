import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/loginService';
import { Button, Typography, Input, Alert } from '@mui/material';
import TwoFactorView from './TwoFactor';

const LoginForm = () => {
	const [phoneMail, setPhoneMail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(null);
	const [email, setEmail] = useState(null);
	const navigate = useNavigate();

	function checkData(input) {
		const regex = new RegExp('^[0-9]+$');
		if (input.length <= 10 && input.match(regex)) return 'phone';
		else return 'email';
	}

	const handleButtonClick = () => {
		const loginData = {
			[checkData(phoneMail)]: phoneMail,
			password,
		};

		login(loginData)
			.then(res => {
				const { token, twoFactorEnabled, mail, userId, manualEntryCode, qRCodeUrl } = res.data;

				if (twoFactorEnabled && mail) {
					setIsTwoFactorEnabled(twoFactorEnabled);
					setEmail(mail);

					return;
				}

				localStorage.setItem('token', token);
				localStorage.setItem('userId', userId);
				navigate('/user');
			})
			.catch(err => {
				if (err.response.data.errors) {
					setErrorMessage(err.response.data.errors[0]);
					return;
				}

				setErrorMessage('Something went wrong. Contact the administrator.');
			});
	};

	return isTwoFactorEnabled && email ? (
		<TwoFactorView email={phoneMail}></TwoFactorView>
	) : (
		<div className='App1'>
			<div className='cover'>
				<Typography variant='h4'>Login</Typography>
				<Alert severity='error' variant='filled' style={{ display: 'none' }}>
					{errorMessage}
				</Alert>
				<div className='alert-box'>
					<Typography variant='h5'>{errorMessage}</Typography>
				</div>
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

				<div class='customBtn'>
					<span class='icon'>
						<img class='login-icons' src='https://i.imgur.com/JsniGks.png' width={25} height={25} alt='googleicon' />
					</span>
					<span class='buttonText'>Sign in with Google</span>
				</div>
				<div class='customBtn'>
					<span class='icon'>
						<img class='login-icons' src='https://i.imgur.com/fDEMtZy.png' width={25} height={25} alt='fbicon' />
					</span>
					<span class='buttonText'>Sign in with Facebook</span>
				</div>
				<div class='customBtn'>
					<span class='icon'>
						<img class='login-icons' src='https://i.imgur.com/5pDDS3b.png' width={25} height={25} alt='msicon' />
					</span>
					<span class='buttonText'>Sign in with Microsoft</span>
				</div>

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
