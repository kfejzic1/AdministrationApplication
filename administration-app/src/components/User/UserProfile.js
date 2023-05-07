import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { Box } from '@mui/system';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
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
	Modal,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUser, getTwoFactorQRCode, toggle2FA as toggle2Factor, getUserId } from '../../services/userService';
import OneSignal from 'react-onesignal';
import SendNotificationModal from './SendNotificationModal';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
	modal: {
		position: 'absolute',
		overflow: 'scroll',
		height: '100%',
		display: 'block',
	},
}));

const ProfilePage = props => {
	const [user, setUser] = useState(null);
	const [qrCode, setQrCode] = useState(null);
	const [showDialog, setShowDialog] = useState(false);
	const [is2FAEnabled, setIs2FAEnabled] = useState(false);
	const [is2FASettedUp, setIs2FASettedUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const classes = useStyles();

	const navigate = useNavigate();

	const RedTableCell = withStyles({
		root: {
			border: '2px solid red',
			borderBottom: '2px solid red',
			borderRadius: '10px', // Add this line to add rounded corners
		},
	})(TableCell);

	const [showTooltip, setShowTooltip] = useState(false);
	const [showTooltipMail, setShowTooltipMail] = useState(false);

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

	function handleInputMouseEnter() {
		setShowTooltip(true);
	}

	function handleInputMouseLeave() {
		setShowTooltip(false);
	}

	function handleInputMouseEnterMail() {
		setShowTooltipMail(true);
	}

	function handleInputMouseLeaveMail() {
		setShowTooltipMail(false);
	}

	function redirectAccountCreationRequest() {
		navigate('/myaccounts');
	}

	const handleShowModal = () => setShowModal(true);

	const handleCloseModal = () => setShowModal(false);

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

								{user?.isEmailValidated ? (
									<TableCell align='center'>{user?.email}</TableCell>
								) : (
									<Tooltip
										title={<Typography fontSize={15}>Email is not confirmed/verified</Typography>}
										open={showTooltipMail}
										placement='right-start'>
										<RedTableCell
											onMouseEnter={handleInputMouseEnterMail}
											onMouseLeave={handleInputMouseLeaveMail}
											align='center'>
											{user?.email}
										</RedTableCell>
									</Tooltip>
								)}
							</TableRow>
							<TableRow>
								<TableCell align='center' variant='head'>
									Phone
								</TableCell>

								{user?.isPhoneValidated ? (
									<TableCell align='center'>{user?.phone}</TableCell>
								) : (
									<Tooltip
										title={<Typography fontSize={15}>Phone is not confirmed/verified</Typography>}
										open={showTooltip}
										placement='right-start'>
										<RedTableCell
											onMouseEnter={handleInputMouseEnter}
											onMouseLeave={handleInputMouseLeave}
											align='center'>
											{user?.phone}
										</RedTableCell>
									</Tooltip>
								)}
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

					<Box className='user-commands'>
						<Button
							variant='contained'
							sx={{ color: 'black' }}
							className='user-commands-btn'
							onClick={redirectAccountCreationRequest}>
							My Accounts
						</Button>
						<Button variant='contained' sx={{ color: 'black' }} className='user-commands-btn' onClick={handleShowModal}>
							Send notification to subscribed users
						</Button>
					</Box>

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

			<Modal
				className={classes.modal}
				open={showModal}
				onClose={handleCloseModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<SendNotificationModal handleClose={handleCloseModal} />
			</Modal>
		</div>
	);
};

export default ProfilePage;
