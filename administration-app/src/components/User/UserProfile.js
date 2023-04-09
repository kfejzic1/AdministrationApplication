import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { Box } from '@mui/system';
import {
	Typography,
	Table,
	TableContainer,
	TableRow,
	TableCell,
	Paper,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	LinearProgress,
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUser, getTwoFactorQRCode, toggle2FA as toggle2Factor } from '../../services/userService';
import LogoutButton from '../Login/Logout';
import OneSignal from 'react-onesignal';
import addNotification from 'react-push-notification';

const ProfilePage = props => {
	const [user, setUser] = useState(null);
	const [qrCode, setQrCode] = useState(null);
	const [showDialog, setShowDialog] = useState(false);
	const [is2FAEnabled, setIs2FAEnabled] = useState(false);
	const [is2FASettedUp, setIs2FASettedUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getUser().then(res => {
			setUser(res.data);
			setIsLoading(false);
			setIs2FAEnabled(res.data.isTwoFactorEnabled);
			setIs2FASettedUp(res.data.authenticatorKey ? true : false);
		});
		props.setToken(localStorage.getItem('token'));
		OneSignal.init({ appId: 'f5a0e436-9c1a-4f3f-81bd-2ce6a01ab8b7' });
	}, []);

	const handle2FASetup = () => {
		getTwoFactorQRCode().then(res => {
			setQrCode(res.data);
		});

		setShowDialog(true);
	};

	const toggle2FA = () => {
		setIsLoading(true);
		toggle2Factor().then(res => {
			if (res.data) setIs2FASettedUp(false);
			setIs2FAEnabled(res.data);
			setIsLoading(false);
		});
	};

	const handleDialogClose = () => {
		setIs2FASettedUp(true);
		setShowDialog(false);
	};

	return (
		<div className='container'>
			<Box className='profile-banner rounded-left text-center'>
				<Box
					className='mt-4'
					component='img'
					sx={{
						height: 250,
						width: 250,
					}}
					style={{ borderRadius: 125 }}
					alt='profile-pic'
					src='https://imgur.com/NAGTvvz.png'
				/>
			</Box>

			<Box>
				<Box className='profile-main text-center'>
					<Typography variant='h3' style={{ background: 'white' }}>
						{user?.userName}
					</Typography>
				</Box>

				<hr style={{ margin: 'auto' }} />

				<Box className='profile-details'>
					<TableContainer className='profile-info' component={Paper}>
						<Table>
							<TableRow>
								<TableCell align='center' variant='head'>
									First Name
								</TableCell>
								<TableCell align='center'>{user?.firstName}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align='center' variant='head'>
									Last Name
								</TableCell>
								<TableCell align='center'>{user?.lastName}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align='center' variant='head'>
									Email
								</TableCell>
								<TableCell align='center'>{user?.email}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align='center' variant='head'>
									Phone
								</TableCell>
								<TableCell align='center'>{user?.phone}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align='center' variant='head'>
									Two-Factor Authentication:
								</TableCell>
								<TableCell align='center'>
									<Button onClick={toggle2FA}>{is2FAEnabled ? 'Disable' : 'Enable'}</Button>
								</TableCell>
							</TableRow>
							{is2FAEnabled ? (
								<TableRow>
									<TableCell align='center' variant='head'>
										{is2FASettedUp
											? 'You have already configured 2FA using Google Authenticator. Do You want to configure it again?'
											: '2FA not setted up!'}
									</TableCell>
									<TableCell align='center'>
										<Button onClick={handle2FASetup}>Setup</Button>
									</TableCell>
								</TableRow>
							) : null}
						</Table>
					</TableContainer>
					<Box sx={{ width: '100%' }} className='mb-2' visibility={isLoading ? 'visible' : 'hidden'}>
						<LinearProgress />
					</Box>
				</Box>
			</Box>

			<Dialog open={showDialog} onClose={handleDialogClose}>
				<DialogTitle>{'Setup 2FA'}</DialogTitle>
				<DialogContent className='text-center'>
					<DialogContentText className='mb-4'>
						Scan QR Code via Google Authenticator App or insert manual key:
					</DialogContentText>
					<Box component='img' className='mx-auto d-block' alt='QR Code' src={qrCode?.url} />
					<DialogContentText className='mt-2'>
						Manual key:
						<Typography variant='body1' fontWeight='bold'>
							{qrCode?.manualString}
						</Typography>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>OK</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ProfilePage;
