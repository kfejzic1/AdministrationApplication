import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getVendor } from '../../../services/vendorService';
import { getAllVendorLocations } from '../../../services/vendorService';
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

export default function VendorPaymentTerms() {
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
					AAAA
				</Paper>
			</Box>
		</Box>
	);
}
