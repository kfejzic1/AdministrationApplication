import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CheckIcon from '@mui/icons-material/Check';
import { getAllOpenClaims } from '../../services/adminClaimService';
const AdminClaims = () => {
	const [value, setValue] = useState(0);
	const [unacceptedClaims, setUnacceptedClaims] = useState([]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		getAllOpenClaims().then(response =>
			setUnacceptedClaims(
				response.data.map(c => {
					return {
						id: c.id,
						transactionId: c.transactionId,
						subject: c.subject,
						description: c.description,
						status: c.status,
					};
				})
			)
		);
	}, []);
	const acceptedClaims = [
		{ id: 1, transactionId: '123456', subject: 'Subject', status: 'Under investigation' },
		{ id: 2, transactionId: '789012', subject: 'Subject', status: 'Under investigation' },
		{ id: 3, transactionId: '345678', subject: 'Subject', status: 'Under investigation' },
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
							<TableCell>Transaction ID</TableCell>
							<TableCell>Subject</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{acceptedClaims.map(claim => (
							<TableRow key={claim.id}>
								<TableCell>{claim.transactionId}</TableCell>
								<TableCell>{claim.subject}</TableCell>
								<TableCell>{claim.description}</TableCell>
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
							<TableCell>Transaction ID</TableCell>
							<TableCell>Subject</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{unacceptedClaims.map(claim => (
							<TableRow key={claim.id}>
								<TableCell>{claim.transactionId}</TableCell>
								<TableCell>{claim.subject}</TableCell>
								<TableCell>{claim.description}</TableCell>
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
