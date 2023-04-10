import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/userService';
import { LinearProgress, Typography, Input, Alert, Box, Button } from '@mui/material';
import TwoFactorView from './TwoFactor';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { GoogleLogin, useGoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';

import { env } from '../../config/env';
import axios from 'axios';
import { responsiveProperty } from '@mui/material/styles/cssUtils';

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
	}, []);

	const checkData = input => {
		const regex = new RegExp('^[0-9]+$');
		if (input.length <= 10 && input.match(regex)) return 'phone';
		else return 'email';
	};

	const handleFacebookLogin = () => {
		console.log("Login Facebook");
	
	}
	

	const googleLogin = useGoogleLogin({
		clientId: "296207493341-aatp57afp9du4ujhiohuc14oqp78jmb8.apps.googleusercontent.com",
		onSuccess: async (codeResponse) => {
			console.log("sadsafsaw je "+ JSON.stringify(codeResponse));
			console.log("sadsafsaw je 123 "+ codeResponse.access_token);
			const tokens = await axios.post(
				env.API_ENV.url + '/api/User/login/google?token=' + codeResponse.access_token, {
				});
	
			console.log("oken bude ovdje " + tokens.data);
		},
		onError: errorResponse => console.log("ERror"+ errorResponse),
	});



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
				props.setToken(token);
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

					<GoogleLoginButton 
						onClick={googleLogin} 
						style={{width: '80%'}} 
					/>		
					<FacebookLoginButton style={{width: '80%'}}/>
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
