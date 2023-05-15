import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/userService';
import { google } from '../../services/userService';
import { facebook } from '../../services/userService';
import { LinearProgress, Typography, Input, Alert, Box, Button, accordionSummaryClasses } from '@mui/material';
import TwoFactorView from './TwoFactor';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { env } from '../../config/env';
import axios, { formToJSON } from 'axios';
import { responsiveProperty } from '@mui/material/styles/cssUtils';
import { getValidateToken } from '../../services/userService';

const LoginForm = props => {
	const [phoneMail, setPhoneMail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(null);
	const [email, setEmail] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		props.setToken(localStorage.getItem('token'));
		getValidateToken(localStorage.getItem('token')).then(response => {
			props.setIsAdmin(userAdmin(response.data));
		});
	}, []);

	const userAdmin = user => {
		console.log('user---=', JSON.stringify(user));
		if (user.roles) {
			var b = user.roles.filter(v => v === 'Admin')[0];
			if (b === 'Admin') {
				console.log('Uslo u ovu funkciju');
				return true;
			}
			return false;
		}
		return false;
	};

	const checkData = input => {
		const regex = new RegExp('^[0-9]+$');
		if (input.length <= 10 && input.match(regex)) return 'phone';
		else return 'email';
	};

	const googleLogin = useGoogleLogin({
		onSuccess: async codeResponse => {
			try {
				const tokens = await google(codeResponse.access_token);
				localStorage.setItem('token', tokens.data.token);
				navigate('/user');
			} catch (error) {
				setErrorMessage(error.response.data.errors[0]);
			}
		},
		onError: errorResponse => setErrorMessage('Error on backend!' + errorResponse),
	});

	const onSuccess = async response => {
		console.log('Login success:', response.accessToken);
		try {
			const tokens = await facebook(response.accessToken);
			console.log('TOken koji smo dobili je ' + JSON.stringify(tokens));
			localStorage.setItem('token', tokens.data.token);
			navigate('/user');
		} catch (err) {
			setErrorMessage(JSON.stringify(err.response.data.errors[0]));
		}
	};
	const onFailure = error => {
		setErrorMessage('Error on backend!' + error);
	};

	const handleButtonClick = () => {
		setIsLoading(true);
		const loginData = {
			[checkData(phoneMail)]: phoneMail,
			password,
		};

		login(loginData)
			.then(res => {
				const { token, twoFactorEnabled, mail, userId, manualEntryCode, qRCodeUrl } = res.data;
				setIsLoading(false);

				if (twoFactorEnabled && mail) {
					setIsTwoFactorEnabled(twoFactorEnabled);
					setEmail(mail);

					return;
				}

				localStorage.setItem('token', token);
				localStorage.setItem('userId', userId);
				getValidateToken(localStorage.getItem('token')).then(response => {
					props.setIsAdmin(userAdmin(response.data));
				});

				navigate('/user');
			})
			.catch(err => {
				setIsLoading(false);

				if (err.response.data.errors) {
					setErrorMessage(err.response.data.errors[0]);
					return;
				}

				setErrorMessage('Something went wrong. Contact the administrator.');
			});
	};

	return isTwoFactorEnabled && email ? (
		<TwoFactorView userData={phoneMail}></TwoFactorView>
	) : (
		<div className='login-page'>
			<div className='login-container'>
				<div className='cover'>
					<Box sx={{ width: '90%' }} visibility={isLoading ? 'visible' : 'hidden'}>
						<LinearProgress />
					</Box>
					<Typography variant='h4'>Login</Typography>
					{errorMessage.length > 0 ? (
						<Alert style={{ width: '80%' }} severity='error' variant='filled'>
							{errorMessage}
						</Alert>
					) : null}
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

					<GoogleLoginButton onClick={googleLogin} style={{ width: '80%' }} />
					<FacebookLogin
						appId='620744499469183'
						callback={onSuccess}
						onFailure={onFailure}
						render={renderProps => (
							<FacebookLoginButton onClick={renderProps.onClick} style={{ width: '80%' }}></FacebookLoginButton>
						)}
					/>

					<Typography>
						You are not registered? <a href='/'>Register</a>
					</Typography>
					<button className='login-btn' onClick={handleButtonClick}>
						{' '}
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
