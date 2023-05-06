import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { createPaymentTerm, getAllPaymentTerms, uploadFile } from '../../../services/vendorService';
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
import PaymentTermsModal from './PaymentTermsModal';
import PaymentTermsTable from './paymentTermsTable/PaymentTermsTable';

export default function PaymentTermsBasicInfo(props) {
	return (
		<Box sx={{ mt: 2, mb: 2, minHeight: '100px' }}>
			<PaymentTermsTable vendorName={props.vendorName} vendorId={props.vendorId} />
		</Box>
	);
}
