import React, { useEffect, useState } from 'react';

import {
	FormControl,
	Select,
	MenuItem,
	Input,
	Button,
	TextField,
	Grid,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	InputLabel,
	Chip,
	Checkbox,
	ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './vendorManagement.css';
import naslovna from './slika1.png';
import { createVendor } from '../../services/vendorService';
import { getAllUsers, getUser, getUserByName, getUserName } from '../../services/userService';
import Loader from '../loaderDialog/Loader';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		minHeight: '40%',
		maxWidth: '50%',
		margin: 'auto',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: '95%',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	textField: {
		minWidth: '95%',
	},
	cardActions: {
		justifyContent: 'center',
		paddingTop: 20,
	},
}));

function VendorManagementModal() {
	const vendor = {
		name: '',
		address: '',
		companyDetails: '',
		createdBy: -1,
		phone: '',
		assignedUserIds: [],
	};

	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: '60%',
			},
		},
	};
	const classes = useStyles();

	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState('');
	const [address, setAddress] = useState('');
	const [details, setDetails] = useState('');
	const [phone, setPhone] = useState('');

	const [open, setOpen] = useState(false);
	const [selectedUserIds, setSelectedUserIds] = useState([]);
	const [errors, setErrors] = useState({ username: false, address: false, phone: false });

	const [loaderState, setLoaderState] = useState({ success: false, loading: true });

	useEffect(() => {
		getAllUsers().then(res => {
			setUsers(res.data);
		});
	}, []);

	const handleUsernameChange = event => {
		setUsername(event.target.value);
	};

	const handleAddressChange = event => {
		setAddress(event.target.value);
	};

	const handleDetailsChange = event => {
		setDetails(event.target.value);
	};

	const handlePhoneChange = event => {
		setPhone(event.target.value);
	};

	const handleChange = event => {
		const { value } = event.target;
		setSelectedUserIds(value);
	};

	const validate = () => {
		var usernameError = false;
		var addressError = false;
		var phoneError = false;

		if (username == '') usernameError = true;
		if (address == '') addressError = true;
		if (phone == '') phoneError = true;

		setErrors({ username: usernameError, address: addressError, phone: phoneError });

		if (usernameError || addressError || phoneError) return false;
		return true;
	};

	const handleSubmit = event => {
		event.preventDefault();

		var validData = validate();

		if (validData) {
			setOpen(true);
			vendor.name = username;
			vendor.address = address;
			vendor.companyDetails = details;
			vendor.phone = phone;
			vendor.assignedUserIds = selectedUserIds;

			getUserByName(getUserName())
				.then(res => {
					vendor.createdBy = res.id;
					createVendor(vendor).then(res => {
						setLoaderState({ ...loaderState, loading: false, success: true });
						setOpen(false);
					});
				})
				.catch(() => {
					setLoaderState({ ...loaderState, loading: false, success: false });
					setOpen(false);
				});
		}
	};

	return (
		<div>
			<div className='container'>
				<form className={classes.root} onSubmit={handleSubmit}>
					<Card className={classes.root}>
						<CardHeader title={'Create B2B Customer'}></CardHeader>
						<CardContent>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<TextField
										className={classes.textField}
										id='outlined-basic'
										label='Name'
										variant='outlined'
										value={username}
										required={true}
										error={errors.username}
										onChange={handleUsernameChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										className={classes.textField}
										id='outlined-basic'
										label='Address'
										variant='outlined'
										value={address}
										required={true}
										error={errors.address}
										onChange={handleAddressChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										className={classes.textField}
										id='outlined-basic'
										label='Details'
										variant='outlined'
										value={details}
										onChange={handleDetailsChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										className={classes.textField}
										id='outlined-basic'
										label='Phone number'
										variant='outlined'
										error={errors.phone}
										value={phone}
										required={true}
										onChange={handlePhoneChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl className={classes.formControl} required>
										<InputLabel id='demo-mutiple-chip-label'>Assign users</InputLabel>
										<Select
											labelId='demo-mutiple-chip-label'
											id='demo-mutiple-chip'
											multiple
											autoWidth
											value={selectedUserIds}
											onChange={handleChange}
											input={<Input id='select-multiple-chip' />}
											renderValue={selected => (
												<div className={classes.chips}>
													{selected.map(userId => (
														<Chip
															key={userId}
															label={users.find(x => x.id === userId).userName}
															className={classes.chip}
														/>
													))}
												</div>
											)}
											MenuProps={MenuProps}>
											{users.map(user => (
												<MenuItem key={user.id} value={user.id}>
													<Checkbox checked={selectedUserIds.includes(user.id)} />
													<ListItemText primary={user.userName} />
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</CardContent>
						<CardActions className={classes.cardActions}>
							<Button variant='contained' type='submit' value='Submit' onClick={handleSubmit}>
								Create
							</Button>
						</CardActions>
					</Card>
				</form>

				<Loader open={open} loaderState={loaderState} />
			</div>
		</div>
	);
}

export default VendorManagementModal;
