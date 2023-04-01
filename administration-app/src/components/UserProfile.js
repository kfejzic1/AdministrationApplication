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
	Checkbox,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUser } from '../services/userService';

const ProfilePage = arg => {
	const [user, setUser] = useState(null);
	const [showDialog, setShowDialog] = useState(false);

	useEffect(() => {
		getUser(localStorage.getItem('userId')).then(res => {
			setUser(res.data);
		});
	}, []);

	const handle2FASetup = () => {
		setShowDialog(true);
	};

	const handleDialogClose = () => {
		setShowDialog(false);
	};

	return (
		<div className='container'>
			<Box className='profile-banner rounded-left'>
				<Box
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
				<Box className='profile-main'>
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
									2FA Enabled:
								</TableCell>
								<TableCell align='center'>
									<Checkbox value={user?.isTwoFactorEnabled} disabled />
								</TableCell>
							</TableRow>
							{user?.isTwoFactorEnabled ? (
								<TableRow>
									<TableCell align='center' variant='head'>
										{user?.authenticatorKey
											? 'You have already configured 2FA using Google Authenticator. Do You want to configure it again?'
											: 'Setup 2FA using Google Authenticator'}
									</TableCell>
									<TableCell align='center'>
										<Button onClick={handle2FASetup}>Setup</Button>
									</TableCell>
								</TableRow>
							) : null}
						</Table>
					</TableContainer>
				</Box>
			</Box>
			{console.log('qr code: ', localStorage.getItem('qrCodeUrl'))}

			<Dialog
				open={showDialog}
				onClose={handleDialogClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>{'Setup 2FA'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Scan QR Code via Google Authenticator App:
					</DialogContentText>
					<Box
						component='img'
						sx={{
							height: 233,
							width: 350,
							maxHeight: { xs: 233, md: 167 },
							maxWidth: { xs: 350, md: 250 },
						}}
						alt='QR Code'
						src={localStorage.getItem('qrCodeUrl')}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>OK</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ProfilePage;
