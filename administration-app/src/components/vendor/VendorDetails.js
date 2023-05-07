import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getVendor } from '../../services/vendorService';
import { getAllVendorLocations } from '../../services/vendorService';
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
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VendorLocationPanel from './location/VendorLocationPanel';
import PaymentTermsBasicInfo from './paymentTerms/PaymentTermsBasicInfo';

export default function VendorDetails() {
	const [vendor, setVendor] = useState([]);
	const [locations, setLocations] = useState([]);
	const params = useParams();

	const fetchData = async () => {
		getVendor(params.id).then(res => {
			setVendor(res.data);
		});
		getAllVendorLocations(params.id).then(res => {
			setLocations(res.data);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Paper
			elevation={4}
			style={{
				margin: '25px',
				backgroundColor: '#F5F5F5',
				height: '100%',
			}}
		>
			<div
				style={{
					backgroundColor: '##ffffff00',
					padding: '10px',
					borderRadius: '5px',
					width: '100%',
					textAlign: 'center',
				}}
			>
				<div style={{ marginBottom: '10px' }}>
					<Typography variant='h4' gutterBottom style={{ marginTop: '3%', color: 'black', fontWeight: 'bold' }}>
						{vendor.name}
					</Typography>
				</div>
				<div style={{ marginTop: '3%' }}>
					<Typography variant='#ffffff00' gutterBottom style={{ marginTop: '9%', color: 'gray', fontWeight: 'bold' }}>
						{vendor.companyDetails}
					</Typography>
				</div>
				{/*
				<div>
					<Typography variant='body1' gutterBottom style={{color: 'black', fontWeight: 'bold'}}>
					Phone: {vendor.phone}
					</Typography>
				</div>
					*/}
			</div>
			<PaymentTermsBasicInfo vendorName={vendor.name} vendorId={params.id} />
			<VendorLocationPanel />
		</Paper>
	);
}
