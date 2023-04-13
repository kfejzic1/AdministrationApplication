import React, { useState } from 'react';
import { Button, Modal, Typography, IconButton, Box, CloseIcon } from '@mui/material';

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
		boxShadow: 24,
		padding: '1.5rem',
		borderRadius: '4px',
		outline: 'none',
		display: 'block',
		width: '60%',
	},
}));

export default function UploadModal() {
	const [open, setOpen] = useState(true); // change the initial state to true to make the modal visible
	const classes = useStyles();
	const [files, setFiles] = useState([]);

	const [dateStartFilter, setDateStartFilter] = useState(null);
	const [dateEndFilter, setDateEndFilter] = useState(null);
	const handleClose = () => {
		setOpen(false);
	};
	const handleFileChange = newFiles => {
		setFiles([...files, ...newFiles]);
	};
	const [value, setValue] = useState(dayjs('2022-04-17'));

	return (
		<Box className={classes.paper}>
			<Typography variant='h6' gutterBottom>
				Upload File
			</Typography>
			<IconButton
				aria-label='close'
				onClick={handleClose}
				sx={{
					position: 'absolute',
					top: 0,
					right: 0,
					color: theme => theme.palette.grey[500],
				}}></IconButton>
			<DropzoneArea onChange={handleFileChange} />
			
			<Box sx={{display:'flex',flexDirection:'row'}}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DesktopDatePicker
								label='Start'
								sx={{ width: 'auto' }}
								maxDate={dateEndFilter}
								value={dateStartFilter}
								onChange={a => {
									setDateStartFilter(a);
								}}
							></DesktopDatePicker>
							<DesktopDatePicker
								minDate={dateStartFilter}
								value={dateEndFilter}
								onChange={a => {
									setDateEndFilter(a);
								}}
								label='End'
							></DesktopDatePicker>
				</LocalizationProvider>
			</Box>
			<Box sx={{ textAlign: 'center', pt: '20px' }}>
				<Button onClick={handleClose}>Close</Button>
			</Box>
		</Box>
	);
}
