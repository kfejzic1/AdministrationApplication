import React, { useState } from 'react';
import { Button, Modal, Typography, IconButton, Box, CloseIcon } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';

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

	const handleClose = () => {
		setOpen(false);
	};
	const handleFileChange = newFiles => {
		setFiles([...files, ...newFiles]);
	};

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
			<Box sx={{ textAlign: 'center', pt: '20px' }}>
				<Button onClick={handleClose}>Close</Button>
			</Box>
		</Box>
	);
}
