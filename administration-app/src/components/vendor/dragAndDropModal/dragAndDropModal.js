import React, { useState } from 'react';
import { Button, Modal, Typography, Box, TextField } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import { DesktopDatePicker } from '@mui/x-date-pickers';
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
		position: 'absolute',
		top: '1rem',
		right: '1rem',
		color: theme.palette.grey[500],
	},
	title: {
		fontSize: '1.5rem',
		fontWeight: 'bold',
		marginBottom: '2rem',
	},
	datePickersContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '2rem 0',
	},
	dropzoneAreaContainer: {
		margin: '2rem 0',
	},
	dropzoneAreaIcon: {
		fontSize: '6rem',
		color: theme.palette.grey[300],
	},
	dropzoneAreaText: {
		fontSize: '1.2rem',
		fontWeight: 'bold',
		margin: '1rem 0',
	},
	cancelButton: {
		marginRight: '20px',
		'&.MuiButton-contained': {
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
		'&.MuiButton-outlined': {
			color: '#ffaf36',
			border: '2px solid #ff9a00',

			'&:hover': {
				border: '2px solid #000000',
				color: '#000000',
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
		margin: '2rem 0',
	},
}));

export default function UploadModal() {
	const [open, setOpen] = useState(true); // change the initial state to true to make the modal visible
	const classes = useStyles();
	const [files, setFiles] = useState([]);

	const [dateStartFilter, setDateStartFilter] = useState(null);
	const [dateEndFilter, setDateEndFilter] = useState(null);
	const [dateDueFilter, setDateDueFilter] = useState(null);
	const [invoiceFrequency, setInvoiceFrequency] = useState('');

	const handleClose = () => {
		setOpen(false);
	};

	const handleFileChange = newFiles => {
		setFiles([...files, ...newFiles]);
	};

	const [value, setValue] = useState(dayjs('2022-04-17'));

	return (
		<Modal open={open} onClose={handleClose}>
			<Box className={classes.paper}>
				<Typography className={classes.title}>Payment Terms Form</Typography>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Box className={classes.datePickersContainer}>
						<DesktopDatePicker
							label='Start Date'
							inputFormat='DD/MM/YYYY'
							value={dateStartFilter}
							onChange={setDateStartFilter}
							renderInput={params => <TextField {...params} />}
						/>
						<DesktopDatePicker
							label='Expiry Date'
							inputFormat='DD/MM/YYYY'
							value={dateEndFilter}
							onChange={setDateEndFilter}
							renderInput={params => <TextField {...params} />}
						/>
					</Box>
				</LocalizationProvider>
				<Box className={classes.dropzoneAreaContainer}>
					<DropzoneArea
						acceptedFiles={['image/*', 'application/pdf']}
						filesLimit={10}
						showFileNamesInPreview={true}
						showFileNames={true}
						useChipsForPreview={true}
						onAdd={handleFileChange}
						dropzoneText={
							<Box>
								<Typography className={classes.dropzoneAreaText}>
									Drag and drop files here or click to select files
								</Typography>
							</Box>
						}
					/>
				</Box>
				<Box className={classes.datePickersContainer}>
					<TextField
						select
						label="Invoice Frequency"
						value={invoiceFrequency}
						onChange={e => setInvoiceFrequency(e.target.value)}
						className={classes.invoiceFrequencyInput}
						SelectProps={{
							native: true,
						}}
						InputLabelProps={{
							shrink: true,
						}}
					>
						<option value="monthly">Monthly</option>
						<option value="weekly">Weekly</option>
						<option value="biweekly">Biweekly</option>
					</TextField>
				</Box>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Box className={classes.datePickersContainer}>
						<DesktopDatePicker
							label='Payment Terms / Due Date'
							inputFormat='DD/MM/YYYY'
							value={dateDueFilter}
							onChange={setDateDueFilter}
							renderInput={params => <TextField {...params} />}
						/>
					</Box>
				</LocalizationProvider>
				<Box>
					<Button className={classes.cancelButton} variant='contained' onClick={handleClose}>
						Cancel
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}
