import React, { useState } from 'react';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './TwoFactor.css';
import { useParams } from 'react-router-dom';
import { twoFactorAuthentication } from '../../services/loginService';

const TwoFactorView = props => {
	const digit1 = useRef(null);
	const digit2 = useRef(null);
	const digit3 = useRef(null);
	const digit4 = useRef(null);
	const digit5 = useRef(null);
	const digit6 = useRef(null);
	const [errorMessage, setErrorMessage] = useState('');

	const handleButtonClick = () => {
		const code =
			digit1.current.value +
			digit2.current.value +
			digit3.current.value +
			digit4.current.value +
			digit5.current.value +
			digit6.current.value;
		twoFactorAuthentication({ code, email: props.email })
			.then(res => {
				setErrorMessage('');
				const { token } = res.data;
				localStorage.setItem('token', token);
				window.location.href = 'http://localhost:3000/';
			})
			.catch(err => {
				setErrorMessage('Neuspješna prijava!');
			});
	};

	return (
		<div className='App1'>
			<div className='cover'>
				<h1>2-Factor Authentication</h1>
				<h3>You received a 6-digit code on your e-Mail/Phone. Please input your code here!</h3>
				<div className='code-container'>
					<input
						className='code-input'
						ref={digit1}
						type='text'
						maxLength={1}
						autoComplete='none'
						onChange={e => {
							if (e.target.value.length > 0) digit2.current.focus();
						}}
					/>
					<input
						className='code-input'
						ref={digit2}
						type='text'
						maxLength={1}
						autoComplete='none'
						onChange={e => {
							if (e.target.value.length > 0) digit3.current.focus();
							else digit1.current.focus();
						}}
					/>
					<input
						className='code-input'
						ref={digit3}
						type='text'
						maxLength={1}
						autoComplete='none'
						onChange={e => {
							if (e.target.value.length > 0) digit4.current.focus();
							else digit2.current.focus();
						}}
					/>
					<input
						className='code-input'
						ref={digit4}
						type='text'
						maxLength={1}
						autoComplete='none'
						onChange={e => {
							if (e.target.value.length > 0) digit5.current.focus();
							else digit3.current.focus();
						}}
					/>
					<input
						className='code-input'
						ref={digit5}
						type='text'
						maxLength={1}
						autoComplete='none'
						onChange={e => {
							if (e.target.value.length > 0) digit6.current.focus();
							else digit4.current.focus();
						}}
					/>
					<input
						className='code-input'
						ref={digit6}
						type='text'
						maxLength={1}
						autoComplete='none'
						onChange={e => {
							if (e.target.value.length === 0) digit5.current.focus();
						}}
					/>
				</div>

				<button className='verify-btn' onClick={handleButtonClick}>
					{' '}
					Verify
				</button>
			</div>
		</div>
	);
};

export default TwoFactorView;
