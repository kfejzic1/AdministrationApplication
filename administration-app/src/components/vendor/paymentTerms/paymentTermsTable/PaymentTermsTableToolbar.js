import React, { useState } from 'react';
import { Toolbar, Tooltip, Typography, Button, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { alpha } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deletePaymentType } from '../../../../services/vendorService';
import PaymentTermsModal from '../PaymentTermsModal';

const useStyles = makeStyles(theme => ({
	button: {
		marginRight: '20px',
		width: '250px',
		'&.MuiButton-contained': {
			backgroundImage: 'linear-gradient(144deg, #ffb649 35%,#ffee00)',
			borderRadius: '10px',
			color: 'black',
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
		'&.MuiButton-outlined': {
			color: '#ffb649',
			border: '2px solid #ffb649',
			'&:hover': {
				border: '2px solid #000000',
				color: '#000000',
			},
		},
	},
	modal: {
		position: 'absolute',
		overflow: 'scroll',
		height: '100%',
		display: 'block',
	},
}));

const tableTheme = createTheme({
	palette: {
		primary: {
			main: '#E7EBF0',
		},
		secondary: {
			main: '#ff9a001f',
		},
		secondary2: {
			main: '#ffaf36',
		},
	},
});
export default function PaymentTermsTableToolBar(props) {
	const [loaderState, setLoaderState] = useState({ success: false, loading: true });

	const classes = useStyles();
	const { numSelected } = props;
	const [open, setOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		props.fetchPaymentTerms();
		setIsEdit(false);
		setOpen(false);
	};
	const handleOpenEdit = () => {
		handleOpen();
		setIsEdit(true);
	};

	let handleDelete = async () => {
		const delVend = await props.selectedIds.forEach(id => {
			deletePaymentType(id)
				.then(res => {
					setLoaderState({ ...loaderState, loading: false, success: true });
					props.fetchPaymentTerms();
				})
				.catch(() => {
					setLoaderState({ ...loaderState, loading: false, success: false });
					setOpen(false);
				});
		});
	};

	const createPaymentTermTooltip = (
		<Tooltip title='Create Payment Term'>
			<Button className={classes.button} size='small' variant='contained' endIcon={<CreateIcon />} onClick={handleOpen}>
				Create Payment Term
			</Button>
		</Tooltip>
	);
	const editPaymentTermTooltip = (
		<Tooltip title='Edit Payment Term'>
			<Button
				className={classes.button}
				size='small'
				variant='outlined'
				endIcon={<EditIcon />}
				onClick={handleOpenEdit}>
				Edit Selected Payment Term
			</Button>
		</Tooltip>
	);

	const deletePaymentTermTooltip = (
		<Tooltip title='Delete Selected Payment Terms'>
			<Button
				className={classes.button}
				size='small'
				variant='outlined'
				endIcon={<DeleteIcon />}
				onClick={handleDelete}>
				Delete Payment Term
			</Button>
		</Tooltip>
	);

	return (
		<ThemeProvider theme={tableTheme}>
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
					...(numSelected > 0 && {
						bgcolor: theme => alpha(theme.palette.secondary.main, theme.palette.action.activatedOpacity),
					}),
				}}>
				{numSelected > 0 ? (
					<Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
						{numSelected} selected
					</Typography>
				) : (
					<Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
						Payment Terms
					</Typography>
				)}

				{numSelected === 1 ? (
					<Stack direction='row' spacing={1}>
						{editPaymentTermTooltip}
						{deletePaymentTermTooltip}
						{createPaymentTermTooltip}
					</Stack>
				) : numSelected > 1 ? (
					<Stack direction='row' spacing={1}>
						{deletePaymentTermTooltip}
						{createPaymentTermTooltip}
					</Stack>
				) : (
					<Stack direction='row' spacing={0}>
						{createPaymentTermTooltip}
					</Stack>
				)}

				<Modal
					className={classes.modal}
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'>
					<PaymentTermsModal
						isEdit={isEdit}
						paymentTerm={props.selectedRows}
						handleClose={handleClose}
						vendorName={props.vendorName}
						vendorId={props.vendorId}
					/>
				</Modal>
			</Toolbar>
		</ThemeProvider>
	);
}

PaymentTermsTableToolBar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};
