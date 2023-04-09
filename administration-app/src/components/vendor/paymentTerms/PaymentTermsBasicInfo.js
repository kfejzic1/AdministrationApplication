import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';

const tableTheme = createTheme({
	palette: {
		primary: {
			main: '#E7EBF0',
		},
		secondary: {
			main: '#ffe2b6',
		},
		secondary2: {
			main: '#ffaf36',
		},
	},
});

const useStyles = makeStyles({
	root: {},
});

export default function VendorPaymentTerms(props) {
	const [contracts, setContracts] = useState([]);

	const handleChange = event => {
		const files = Array.from(event.target.files);
		const [file] = files;

		setContracts(file);
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
			setContracts([]);
		});
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
					<input
						accept='.pdf'
						// className={classes.input}
						style={{ display: 'none' }}
						id='raised-button-file'
						multiple
						type='file'
						onChange={handleChange}
					/>
					<label htmlFor='raised-button-file'>
						<Button variant='raised' component='span'>
							Upload
						</Button>
					</label>
				</Paper>
			</Box>
		</Box>
	);
}
