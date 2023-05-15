import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CheckIcon from '@mui/icons-material/Check';
import { getAllRequests, approveRequest } from '../../services/currencyAccountCreationService';

function AccountRequestsDialog(props) {
	const [accountRequests, setAccountRequests] = useState([]);
	const [change, setChange] = useState(false);
	const { open, onClose } = props;

	useEffect(() => {
		getAllRequests().then(request => {
			setAccountRequests(
				request.data.map(r => {
					return {
						id: r.id,
						firstName: r.user.firstName,
						lastName: r.user.lastName,
						currency: r.currency.name,
						email: r.user.email,
						path: r.requestDocumentPath,
					};
				})
			);
		});
	}, [change]);
	const handleApprove = id => {
		approveRequest(id)
			.then(response => {
				setChange(!change);
			})
			.catch(console.error('Error while approving request!'));
	};

	const handleDownload = request => {};
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Account Creation Requests</DialogTitle>
			<DialogContent>
				<List>
					{accountRequests.map(request => (
						<ListItem key={request.id}>
							<ListItemText
								primary={`${request.firstName} ${request.lastName}`}
								secondary={`${request.email}, ${request.currency}`}
							/>
							<Button onClick={() => handleApprove(request.id)}>
								<CheckIcon />
							</Button>
							<Button onClick={() => handleDownload(request)}>
								<DownloadIcon />
							</Button>
						</ListItem>
					))}
				</List>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AccountRequestsDialog;
