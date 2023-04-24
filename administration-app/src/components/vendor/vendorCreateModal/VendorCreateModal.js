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
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';
import './vendorManagement.css';
import naslovna from './slika1ChangedColor.png';
import { createVendor } from '../../../services/vendorService';
import { getAllUsers, getUserByName, getUserId } from '../../../services/userService';
import Loader from '../../loaderDialog/Loader';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		minHeight: '50%',
		maxWidth: '90%',
		margin: 'auto',
		border: 'none',
	},
	card: {
		border: 'none',
		padding: '5px',
	},
	button: {
		width: '250px',
		marginRight: '20px',
		'&.MuiButton-contained': {
			backgroundImage: 'linear-gradient(144deg, #ffb649 35%,#ffee00)',
			borderRadius: '15px',
			color: 'black',
			width: '8rem',
			'&:hover': {
				backgroundImage: 'linear-gradient(144deg, #e9a642 65%,#e9de00)',
				boxShadow: 'none',
			},
			'&:disabled': {
				backgroundColor: '#ffffff',
				boxShadow: 'none',
				color: '#d3d3d3',
			},
		},
	},
	formControl: {
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
		justifyContent: 'right',
		paddingTop: 20,
	},
	image: {
		width: '100%',
		height: '100%',
	},
}));

function VendorCreateModal(props) {
	const vendor = {
		name: '',
		address: '',
		companyDetails: '',
		createdBy: -1,
		phone: '',
		assignedUserIds: [],
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

	const handleChange = (event, values) => {
		setSelectedUserIds(values.map(x => x.id));
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

			vendor.createdBy = getUserId();
			createVendor(vendor)
				.then(res => {
					setLoaderState({ ...loaderState, loading: false, success: true });
					setOpen(false);
					props.handleClose();
				})
				.catch(error => {
					console.log('error', error);
					setLoaderState({ ...loaderState, loading: false, success: false });
					setOpen(false);
				});
		}
	};

	return (
		<div className='p-0 mt-5'>
			<form className={classes.root} onSubmit={handleSubmit}>
				<Card className={classes.card}>
					<CardHeader align='left' title={'Create B2B Customer'}></CardHeader>
					<CardContent>
						<Stack direction='row' spacing={2}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										className={classes.textField}
										id='standard-basic'
										label='Name'
										variant='standard'
										value={username}
										required={true}
										error={errors.username}
										onChange={handleUsernameChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										className={classes.textField}
										id='standard-basic'
										label='Address'
										variant='standard'
										value={address}
										required={true}
										error={errors.address}
										onChange={handleAddressChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										className={classes.textField}
										id='standard-basic'
										label='Details'
										variant='standard'
										value={details}
										onChange={handleDetailsChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										className={classes.textField}
										id='standard-basic'
										type='tel'
										label='Phone number'
										variant='standard'
										error={errors.phone}
										value={phone}
										required={true}
										onChange={handlePhoneChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl className={classes.formControl}>
										<Autocomplete
											style={{ margin: '0' }}
											multiple
											id='tags-standard'
											options={users}
											filterSelectedOptions
											getOptionLabel={option => option.userName}
											onChange={handleChange}
											renderInput={params => (
												<TextField
													{...params}
													className={classes.textField}
													variant='standard'
													label='Assign Users'
													placeholder='(User)'
												/>
											)}
										/>
									</FormControl>
								</Grid>
							</Grid>
							<div className={'imageBcg'}>
								<img src={naslovna} alt='your-image-description' />
							</div>
						</Stack>
					</CardContent>
					<CardActions className={classes.cardActions}>
						<Button
							className={classes.button}
							variant='contained'
							size='small'
							type='submit'
							value='Submit'
							onClick={handleSubmit}>
							Create
						</Button>
					</CardActions>
				</Card>
			</form>

			<Loader open={open} loaderState={loaderState} />
		</div>
	);
}

export default VendorCreateModal;
