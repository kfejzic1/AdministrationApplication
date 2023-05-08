import React, { useState } from 'react';
import { Box, Tab, Tabs, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CheckIcon from '@mui/icons-material/Check';
const AdminClaims = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const acceptedClaims = [
		{ id: 1, transactionId: '123456', subject: 'Subject', status: 'Under investigation' },
		{ id: 2, transactionId: '789012', subject: 'Subject', status: 'Under investigation' },
		{ id: 3, transactionId: '345678', subject: 'Subject', status: 'Under investigation' },
	];

	const unacceptedClaims = [
		{ id: 4, transactionId: '901234', status: 'Open' },
		{ id: 5, transactionId: '567890', status: 'Open' },
		{ id: 6, transactionId: '234567', status: 'Open' },
	];

	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<Tabs value={value} onChange={handleChange} aria-label='Claims Tabs'>
				<Tab label='Accepted Claims' />
				<Tab label='Unaccepted Claims' />
			</Tabs>
			<Box hidden={value !== 0}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Transaction ID</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{acceptedClaims.map(claim => (
							<TableRow key={claim.id}>
								<TableCell>{claim.id}</TableCell>
								<TableCell>{claim.transactionId}</TableCell>
								<TableCell>{claim.status}</TableCell>
								<TableCell>
									<Button onClick={() => {}}>
										<CheckIcon />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
			<Box hidden={value !== 1}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Transaction ID</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{unacceptedClaims.map(claim => (
							<TableRow key={claim.id}>
								<TableCell>{claim.id}</TableCell>
								<TableCell>{claim.transactionId}</TableCell>
								<TableCell>{claim.status}</TableCell>
								<TableCell>
									<Button onClick={() => {}}>
										<PlaylistAddIcon />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</Box>
	);
};

export default AdminClaims;
