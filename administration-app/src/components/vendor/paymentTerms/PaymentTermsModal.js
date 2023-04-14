import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Box, TextField, LinearProgress } from '@mui/material';
import moment from 'moment';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { createPaymentTerm, getInvoiceFrequencies, uploadFile } from '../../../services/vendorService';
import dayjs from 'dayjs';

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'white',
		boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
		padding: '2rem',
		borderRadius: '4px',
		outline: 'none',
		display: 'block',
		width: '60%',
		textAlign: 'center',
	},
	closeButton: {
		'&.MuiButton-outlined': {
			width: '7em',
			color: theme.palette.grey[500],
			border: '2px solid',
			borderColor: theme.palette.grey[500],

			'&:hover': {
				border: '2px solid #000000',
				color: '#000000',
			},
		},
	},
	title: {
		textAlign: 'left',
		fontSize: '1.5rem',
		fontWeight: 'bold',
		marginBottom: '2rem',
	},
	datePickersContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: '2rem',
	},
	dropzoneAreaContainer: {
		margin: '2rem 0',
	},
	dropZone: {
		padding: 10,
		minHeight: '160px',
		'.MuiDropzoneArea-text': {
			marginTop: 0,
		},
	},
	saveButton: {
		'&.MuiButton-contained': {
			width: '7em',
			marginLeft: '10px',
			backgroundColor: '#ffaf36',
			color: 'black',
			'&:hover': {
				backgroundColor: '#ea8c00',
				boxShadow: 'none',
			},
			'&:disabled': {
				backgroundColor: '#ffffff',
				boxShadow: 'none',
				color: '#d3d3d3',
			},
		},

		'&.MuiButton-text': {
			backgroundImage: 'linear-gradient(144deg, #ffb649 35%,#ffee00)',
			alignItems: 'center',
			borderRadius: '10px',
			color: '#222222',
			textTransform: 'none',
			width: '40%',
			padding: '1px 15px',
			boxShadow: 'rgba(0, 0, 0, .3) 2px 8px 8px -5px',
			'&:hover': {
				backgroundImage: 'linear-gradient(144deg, #e9a642 65%,#e9de00)',
				boxShadow: 'rgba(0, 0, 0, .2) 15px 28px 25px -18px',
			},
		},
	},
	invoiceFrequencyInput: {
		width: '100%',
	},
	dateInput: {
		width: '45%',
	},
	footer: {
		textAlign: 'right',
	},
	textField: {
		width: '100%',
	},
}));

export default function PaymentTermsModal(props) {
	const classes = useStyles();
	const [files, setFiles] = useState([]);

	const [name, setName] = useState('');
	const [dateStart, setDateStart] = useState(null);
	const [dateEnd, setDateEnd] = useState(null);
	const [dateDue, setDateDue] = useState(null);
	const [invoiceFrequency, setInvoiceFrequency] = useState([]);
	const [selectedInvoiceFrequency, setSelectedInvoiceFrequency] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		console.log('props', props);
		getInvoiceFrequencies().then(res => {
			setSelectedInvoiceFrequency(res.data[0].id);
			setInvoiceFrequency(res.data.map(x => <option value={x.id}>{x.name}</option>));
		});

		if (props.isEdit) {
			setName(props.paymentTerm.name);
			setDateStart(dayjs(props.paymentTerm.startDate));
			setDateEnd(dayjs(props.paymentTerm.expiryDate));
			setDateDue(dayjs(props.paymentTerm.dueDate));
			setSelectedInvoiceFrequency(props.paymentTerm.invoiceFrequencyType.id);
		}
	}, []);

	const handleFileChange = newFiles => {
		setFiles([...files, ...newFiles]);
	};

	const handleSave = () => {
		setIsLoading(true);
		console.log('files', files);
		const [file] = files;

		const calls = files.map(x => new Promise(resolve => resolve(uploadFile(x, 'vendor/contracts', props.vendorName))));

		Promise.allSettled(calls).then(res => {
			var documentIds = res.map(x => x.value.data);
			var request = {
				name: name,
				startDate: dateStart,
				expiryDate: dateEnd,
				invoiceFrequencyTypeId: selectedInvoiceFrequency,
				documentIds,
				dueDate: dateDue,
			};
			createPaymentTerm(request)
				.then(res => {
					setIsLoading(false);
					props.handleClose();
				})
				.catch(err => {
					setIsLoading(false);
					console.log('err', err);
				});
		});
	};

	const handleEdit = () => {};

	return (
		<Box className={classes.paper}>
			{isLoading && (
				<Box sx={{ width: '100%' }}>
					<LinearProgress />
				</Box>
			)}
			<h1 className={classes.title}>Payment Terms Form</h1>
			<TextField
				className={classes.textField}
				id='standard-basic'
				label='Name'
				variant='outlined'
				value={name}
				required={true}
				onChange={e => setName(e.target.value)}
			/>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Box className={classes.datePickersContainer}>
					<DesktopDatePicker
						className={classes.dateInput}
						label='Start Date'
						value={dateStart}
						onChange={setDateStart}
						renderInput={params => <TextField {...params} />}
					/>
					<DesktopDatePicker
						className={classes.dateInput}
						label='Expiry Date'
						value={dateEnd}
						onChange={setDateEnd}
						renderInput={params => <TextField {...params} />}
					/>
				</Box>
			</LocalizationProvider>

			<Box className={classes.datePickersContainer}>
				<TextField
					select
					label='Invoice Frequency'
					value={selectedInvoiceFrequency}
					defaultValue={invoiceFrequency[0]}
					onChange={e => setSelectedInvoiceFrequency(e.target.value)}
					className={classes.invoiceFrequencyInput}
					SelectProps={{
						native: true,
					}}
					InputLabelProps={{
						shrink: true,
					}}>
					{invoiceFrequency}
				</TextField>
			</Box>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Box className={classes.datePickersContainer}>
					<DesktopDatePicker
						className={classes.dateInput}
						label='Payment Terms / Due Date'
						inputFormat='DD/MM/YYYY'
						value={dateDue}
						onChange={setDateDue}
						renderInput={params => <TextField {...params} />}
					/>
				</Box>
			</LocalizationProvider>

			<Box className={classes.dropzoneAreaContainer}>
				<DropzoneArea
					dropzoneClass={classes.dropZone}
					acceptedFiles={['application/pdf']}
					filesLimit={10}
					showFileNamesInPreview={true}
					showFileNames={true}
					useChipsForPreview={true}
					onChange={handleFileChange}
					dropzoneText={<Typography sx={{ margin: '0' }}>Drag and drop files here or click to select files</Typography>}
				/>
			</Box>
			<Box className={classes.footer}>
				<Button className={classes.closeButton} variant='outlined' onClick={props.handleClose}>
					Cancel
				</Button>
				{props.isEdit ? (
					<Button className={classes.saveButton} variant='contained' onClick={handleEdit}>
						Edit
					</Button>
				) : (
					<Button className={classes.saveButton} variant='contained' onClick={handleSave}>
						Create
					</Button>
				)}
			</Box>
		</Box>
	);
}
