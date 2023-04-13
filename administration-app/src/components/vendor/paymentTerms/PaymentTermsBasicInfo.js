import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { createPaymentTerm, uploadFile } from '../../../services/vendorService';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
	FormControlLabel,
	Switch,
	Checkbox,
	Paper,
	Typography,
	Divider,
	Button,
	Modal,
	LinearProgress,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import { DropzoneDialog } from 'material-ui-dropzone';
import Loader from '../../loaderDialog/Loader';

const useStyles = makeStyles({
	root: {},
	button: {
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
});

export default function VendorPaymentTerms(props) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const classes = useStyles();

	const handleOpen = () => setOpen(true);

	const handleSave = files => {
		console.log('files', files);
		const [file] = files;

		const calls = files.map(x => new Promise(resolve => resolve(uploadFile(x, 'vendor/contracts', props.vendorName))));

		Promise.allSettled(calls).then(res => {
			var documentIds = res.map(x => x.value.data);
			var request = {
				startDate: new Date(),
				expiryDate: new Date(),
				invoiceFrequencyTypeId: 1,
				documentIds,
				dueDate: new Date(),
			};
			createPaymentTerm(request)
				.then(res => console.log('res', res))
				.catch(err => console.log('err', err));
		});
		setOpen(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ mt: 2, mb: 2, minHeight: '100px' }}>
			<Box sx={{ width: '97%', margin: 'auto', pt: '1%' }}>
				<Paper elevation={2} sx={{ width: '100%', mb: 2, border: 'none' }}>
					<Typography
						sx={{
							pl: { sm: 2 },
							mt: 2,
							mb: 2,
							flex: '1 1 100%',
						}}
						variant='h6'
						id='tableTitle'
						component='div'>
						Payment Terms
					</Typography>
					<Divider />
					<Button classes={{ root: classes.button }} onClick={handleOpen} variant='contained' color='primary'>
						Add File
					</Button>

					<DropzoneDialog
						open={open}
						onSave={handleSave}
						acceptedFiles={['application/pdf']}
						showPreviews={true}
						maxFileSize={5000000}
						onClose={handleClose}
					/>

					<Loader open={loading} />
				</Paper>
			</Box>
		</Box>
	);
}
