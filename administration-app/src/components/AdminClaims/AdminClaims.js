import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CheckIcon from '@mui/icons-material/Check';
import { getAllOpenClaims, getAssignedClaims, assignClaim } from '../../services/adminClaimService';
const AdminClaims = () => {
	const [value, setValue] = useState(0);
	const [unassignedClaims, setUnassignedClaims] = useState([]);
	const [assignedClaims, setAssignedClaims] = useState([]);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const assignClaimToAdmin = id => {
		assignClaim({ transcationClaimId: id }).then(console.log('Assigned')).catch(console.error('Not assigned'));
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
		</Box>
	);
};

export default AdminClaims;
