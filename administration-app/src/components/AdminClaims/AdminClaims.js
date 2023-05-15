import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CheckIcon from '@mui/icons-material/Check';
import ForumIcon from '@mui/icons-material/Forum';
import { getAllOpenClaims, getAssignedClaims, assignClaim, updateClaim } from '../../services/adminClaimService';
import MessagingDialog from './AdminChat';
const AdminClaims = () => {
	const [value, setValue] = useState(0);
	const [unassignedClaims, setUnassignedClaims] = useState([]);
	const [assignedClaims, setAssignedClaims] = useState([]);
	const [change, setChange] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [currentClaim, setCurrentClaim] = useState(-1);

	const onDialogClose = () => {
		setOpenDialog(false);
		setCurrentClaim(-1);
	};

	const onDialogOpen = id => {
		setOpenDialog(true);
		setCurrentClaim(id);
	};
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const assignClaimToAdmin = id => {
		assignClaim({ transactionClaimId: id })
			.then(response => console.log('Assigned'))
			.catch(error => console.error('Not assigned', error));
	};

	const updateStatus = claim => {
		if (claim.status !== 'Solved_Confirmed') {
			let newStatus = claim.status === 'Solved' ? 'Solved_Confirmed' : 'Solved';
			updateClaim({ transactionClaimId: claim.id, claimStatus: newStatus })
				.then(response => setChange(!change))
				.catch(error => console.error('Error while changing claim status', error));
		}
	};
	useEffect(() => {
		getAllOpenClaims().then(response =>
			setUnassignedClaims(
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

	useEffect(() => {
		getAssignedClaims().then(response =>
			setAssignedClaims(
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

	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<Tabs value={value} onChange={handleChange} aria-label='Claims Tabs'>
				<Tab label='Your Claims' />
				<Tab label='Unassigned Claims' />
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
						{assignedClaims.map(claim => (
							<TableRow key={claim.id}>
								<TableCell>{claim.transactionId}</TableCell>
								<TableCell>{claim.subject}</TableCell>
								<TableCell>{claim.description}</TableCell>
								<TableCell>{claim.status}</TableCell>
								<TableCell>
									<Button
										onClick={() => {
											updateStatus(claim);
										}}
									>
										<CheckIcon />
									</Button>
									<Button
										onClick={() => {
											onDialogOpen(claim.id);
										}}
									>
										<ForumIcon></ForumIcon>
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
						{unassignedClaims.map(claim => (
							<TableRow key={claim.id}>
								<TableCell>{claim.transactionId}</TableCell>
								<TableCell>{claim.subject}</TableCell>
								<TableCell>{claim.description}</TableCell>
								<TableCell>{claim.status}</TableCell>
								<TableCell>
									<Button
										onClick={() => {
											assignClaimToAdmin(claim.id);
										}}
									>
										<PlaylistAddIcon />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
			<MessagingDialog open={openDialog} onClose={onDialogClose} claimId={currentClaim}></MessagingDialog>
		</Box>
	);
};

export default AdminClaims;
