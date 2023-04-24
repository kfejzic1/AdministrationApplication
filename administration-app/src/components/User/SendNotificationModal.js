import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Button, Box } from '@mui/material';
import { sendNotification } from '../../services/utilityService';
import Textarea from '@mui/joy/Textarea';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const SendNotificationModal = props => {
	const [message, setMessage] = useState(null);
	const [showDialog, setShowDialog] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		if (message) sendNotification(message);
		setShowDialog(true);
	};

	const handleMessageChange = event => {
		setMessage(event.target.value);
	};

	const handleDialogClose = () => {
		setShowDialog(false);
		props.handleClose();
	};

	return (
		<div class='container h-100'>
			<div class='row h-100 justify-content-center align-items-center'>
				<form onSubmit={handleSubmit} class='col-8'>
					<Card>
						<CardHeader align='left' title={'Create notification for subscribed users'}></CardHeader>
						<CardContent>
							<Textarea placeholder='Type message content…' onChange={handleMessageChange} />
						</CardContent>
						<CardActions style={{ justifyContent: 'right', paddingTop: 20 }}>
							<Button variant='contained' size='small' type='submit' value='Submit'>
								Send notification
							</Button>
						</CardActions>
					</Card>
				</form>
				<Dialog open={showDialog} onClose={handleDialogClose}>
					<DialogTitle>{'Confirmation'}</DialogTitle>
					<DialogContent className='text-center'>
						<DialogContentText className='mb-4'>Successfully sent.</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose}>OK</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
};

export default SendNotificationModal;
