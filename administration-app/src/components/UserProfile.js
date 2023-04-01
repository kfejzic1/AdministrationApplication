import React, { useState } from 'react';
import './UserProfile.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import {
	Typography,
	Table,
	TableContainer,
	TableBody,
	TableRow,
	TableCell,
	Paper,
	Grid,
	TextField,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUser } from '../services/userService';

const ProfilePage = arg => {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const user = useState('7d0dfb8f-46b6-4f0f-a122-cacc41f9da00');

	getUser({ UserName: arg.user[0] }).then(res => {
		setUserName(res.data.userName);
		setEmail(res.data.email);
	});

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
						{userName}
					</Typography>
					<Typography variant='h6'>{email}</Typography>
				</Box>

				<hr style={{ margin: 'auto' }} />

				<Box className='profile-details'>
					<TableContainer className='profile-info' component={Paper}>
						<Table>
							<TableRow>
								<TableCell align='center' variant='head'>
									First Name
								</TableCell>
								<TableCell align='center'>Ime</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align='center' variant='head'>
									Last Name
								</TableCell>
								<TableCell align='center'>Prezime</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align='center' variant='head'>
									Age
								</TableCell>
								<TableCell align='center'>22</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align='center' variant='head'>
									Company
								</TableCell>
								<TableCell align='center'>Elektrotehnički fakultet Sarajevo</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align='center' variant='head'>
									Country
								</TableCell>
								<TableCell align='center'>Bosnia & Herzegovina</TableCell>
							</TableRow>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</div>
	);
};

export default ProfilePage;
