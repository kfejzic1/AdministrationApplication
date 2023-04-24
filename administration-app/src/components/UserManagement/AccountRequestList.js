import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';

const accountRequests = [
	{
		id: 1,
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@example.com',
		address: '123 Main St, Anytown USA',
		phone: '555-1234',
	},
	{
		id: 2,
		firstName: 'Jane',
		lastName: 'Doe',
		email: 'jane.doe@example.com',
		address: '456 Elm St, Anytown USA',
		phone: '555-5678',
	},
];

const AccountRequestList = ({ open, onClose }) => {
	const [openList, setOpenList] = useState(open);

	const handleApprove = id => console.log(`Approving account request with ID ${id}`);
	const handleDecline = id => console.log(`Declining account request with ID ${id}`);

	const handleDownload = () => {
		// Create PDF containing user information
		console.log('Downloading PDF');
	};

	return (
		<div>
			<Dialog open={openList} onClose={onClose}>
				<DialogTitle>Account Creation Requests</DialogTitle>
				<DialogContent>
					<List>
						{accountRequests.map(request => (
							<ListItem key={request.id}>
								<ListItemText
									primary={`${request.firstName} ${request.lastName}`}
									secondary={`${request.email}, ${request.address}, ${request.phone}`}
								/>
								<Button onClick={() => handleApprove(request.id)}>Approve</Button>
								<Button onClick={() => handleDecline(request.id)}>Decline</Button>
							</ListItem>
						))}
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDownload}>Download PDF</Button>
					<Button onClick={onClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AccountRequestList;
