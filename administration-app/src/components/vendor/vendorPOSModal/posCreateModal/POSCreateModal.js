import React, { useEffect, useState } from 'react';

import {
	Button,
	TextField,
	Grid,
	Card,
	CardHeader,
	CardContent,
	CardActions,
} from '@material-ui/core';
import { Stack } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import './posCreateModal.css';
import { Create } from '../../../../services/posService';
import Loader from '../../../loaderDialog/Loader';

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
		marginRight: '5%',
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
		justifyContent: 'right',
		paddingTop: 20,
	},
}));

function PosCreateModal(props) {
	const pos = {
		name: '',
		addressID: '',
	};

	const { locationID } = props;

	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: '60%',
			},
		},
	};
	const classes = useStyles();

	const [name, setName] = useState('');
	
	const [open, setOpen] = useState(false);

	const [errors, setErrors] = useState({ name: false});
	const [loaderState, setLoaderState] = useState({ success: false, loading: true });

	const handleNameChange = event => {
		setName(event.target.value);
	};

	const validate = () => {
		var nameError = false;
		
		if (name == '') nameError = true;

		setErrors({ name: nameError});

		if (nameError) return false;
		return true;
	};

	const handleSubmit = event => {
		event.preventDefault();

		var validData = validate();

		if (validData) {
			setOpen(true);
			pos.Name = name;
            pos.LocationID = locationID;
			console.log(pos);
            Create(pos).then(res => {
                setLoaderState({ ...loaderState, loading: false, success: true });
                setOpen(false);
                props.handleClose();
            }).catch(() => {
                setLoaderState({ ...loaderState, loading: false, success: false });
                setOpen(false);
                props.handleClose();
            });;
		}
	};

	return (
		<div>
			<div className='container'>
				<form className={classes.root} onSubmit={handleSubmit}>
					<Card classname={classes.card}>
						<CardHeader align='left' title={'Create a Point of Sale'}></CardHeader>
						<CardContent>
							<Stack direction='row' spacing={2}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											className={classes.textField}
											id='standard-basic'
											label='Name'
											variant='standard'
											value={name}
											required={true}
											error={errors.name}
											onChange={handleNameChange}
										/>
									</Grid>
								</Grid>
							</Stack>
						</CardContent>
						<CardActions className={classes.cardActions}>
							<Button className={classes.button} variant='contained' size='small' type='submit' value='Submit' onClick={handleSubmit}>
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

export default PosCreateModal;
