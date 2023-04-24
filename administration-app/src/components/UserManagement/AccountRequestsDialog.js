import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import CheckIcon from '@mui/icons-material/Check';
const accounts = [
	{
		id: 1,
		firstName: 'Neko',
		lastName: 'Nekic',
		email: 'nekonekic@mail.com',
		address: 'Adresa',
		phone: '111111',
	},
	{
		id: 2,
		firstName: 'Niko',
		lastName: 'Nikic',
		email: 'nikonikic@mail.com',
		address: 'Adresa',
		phone: '123456',
	},
];
function AccountRequestsDialog(props) {
	const [accountRequests, setAccountRequests] = useState(accounts);
	const { open, onClose } = props;
	const handleApprove = id => {
		setAccountRequests(accountRequests.filter(r => r.id !== id));
	};
	const handleDecline = id => {
		setAccountRequests(accountRequests.filter(r => r.id !== id));
	};

	const handleDownload = request => {
		const doc = new jsPDF();
		doc.text(`Name: ${request.firstName} ${request.lastName}`, 10, 20);
		doc.text(`Address: ${request.address}`, 10, 30);
		doc.text(`Phone: ${request.phone}`, 10, 40);
		doc.text(`Email: ${request.email}`, 10, 50);
		doc.save(`${request.firstName}-${request.lastName}.pdf`);
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Account Creation Requests</DialogTitle>
			<DialogContent>
				<List>
					{accountRequests.map(request => (
						<ListItem key={request.id}>
							<ListItemText
								primary={`${request.firstName} ${request.lastName}`}
								secondary={`${request.email}, ${request.address}, ${request.phone}`}
							/>
							<Button onClick={() => handleApprove(request.id)}>
								<CheckIcon />
							</Button>
							<Button onClick={() => handleDecline(request.id)}>
								<ClearIcon />
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
