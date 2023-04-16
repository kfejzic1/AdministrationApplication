import React, { useState } from 'react';
import { Toolbar, Tooltip, Typography, Button, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import POSTable from '../vendorPOSModal/posTableModal/POSTable';
import { deleteVendorLocation } from '../../../services/vendorService';
import { alpha } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocationCreateModal from './locationCreateModal/LocationCreateModal';
import LocationEditModal from './locationEditModal/LocationEditModal';
import Loader from '../../loaderDialog/Loader';

const useStyles = makeStyles(theme => ({
	button: {
		marginRight: '20px',
		'&.MuiButton-contained': {
			backgroundImage: 'linear-gradient(144deg, #ffb649 35%,#ffee00)',
			borderRadius: '10px',
			color: 'black',
			width: '15rem',
			height: '30px',
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
			height: '30px',
			width: '15rem',
			border: '2px solid #ffb649',
			'&:hover': {
				border: '2px solid #000000',
				color: '#000000',
			},
		},
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

export default function LocationTableToolbar(props) {
	const [loaderState, setLoaderState] = useState({ success: false, loading: true });
	const [openLoader, setOpenLoader] = useState(false);

	const [openPOS, setOpenPOS] = useState(false);
	const handleOpenPOS = () => setOpenPOS(true);
	const handleClosePOS = () => setOpenPOS(false);

	const classes = useStyles();
	const { numSelected } = props;
	const { selectedIds } = props;

	const [openEdit, setOpenEdit] = useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => {
		props.fetchLocations();
		setOpenEdit(false);
	};

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		props.fetchLocations();
		setOpen(false);
	};

	async function deleteAddresses() {
		setOpenLoader(true);
		const delAdr = await selectedIds.forEach(id => {
			deleteVendorLocation({ id: id })
				.then(res => {
					setLoaderState({ ...loaderState, loading: false, success: true });
					props.fetchLocations();
					setOpenLoader(false);
				})
				.catch(() => {
					setLoaderState({ ...loaderState, loading: false, success: false });
					setOpen(false);
				});
		});
		props.refreshSelected([]);
	}

	const createAddressTooltip = (
		<Tooltip title='Create Address'>
			<Button className={classes.button} size='small' variant='contained' endIcon={<CreateIcon />} onClick={handleOpen}>
				Create Address
			</Button>
		</Tooltip>
	);

	const pointsOfSalesTooltip = (
		<Tooltip title='Points of Sales'>
			<Button
				className={classes.button}
				size='small'
				variant='outlined'
				endIcon={<PointOfSaleIcon />}
				onClick={handleOpenPOS}
			>
				Points of sales
			</Button>
		</Tooltip>
	);

	const deleteAddressTooltip = (
		<Tooltip title='Delete Selected Addresses'>
			<Button
				className={classes.button}
				size='small'
				variant='outlined'
				endIcon={<DeleteIcon />}
				onClick={deleteAddresses}
			>
				Delete Addresses
			</Button>
		</Tooltip>
	);

	const editAddressTooltip = (
		<Tooltip title='Edit Selected Address'>
			<Button
				className={classes.button}
				size='small'
				variant='outlined'
				endIcon={<EditIcon />}
				onClick={handleOpenEdit}
			>
				Edit Address
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
				}}
			>
				{numSelected > 0 ? (
					<Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
						{numSelected} selected
					</Typography>
				) : (
					<Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
						Locations
					</Typography>
				)}

				{numSelected === 1 ? (
					<Stack direction='row' spacing={1}>
						{pointsOfSalesTooltip}
						{editAddressTooltip}
						{deleteAddressTooltip}
						{createAddressTooltip}
					</Stack>
				) : numSelected > 1 ? (
					<Stack direction='row' spacing={1}>
						{deleteAddressTooltip}
						{createAddressTooltip}
					</Stack>
				) : (
					<Stack direction='row' spacing={0}>
						{createAddressTooltip}
					</Stack>
				)}
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<LocationCreateModal handleClose={handleClose} vendorId={props.vendorId} />
				</Modal>

				<Modal
					open={openEdit}
					onClose={handleCloseEdit}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<LocationEditModal handleClose={handleCloseEdit} vendorId={props.vendorId} locationId={selectedIds} />
				</Modal>

				<Modal
					sx={{ mt: '5%' }}
					open={openPOS}
					onClose={handleClosePOS}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<POSTable locationID={selectedIds[0]} handleClose={handleClosePOS} />
				</Modal>
			</Toolbar>
			<Loader open={openLoader} loaderState={loaderState} />
		</ThemeProvider>
	);
}

LocationTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
	fetchLocations: PropTypes.func.isRequired,
	selectedIds: PropTypes.array.isRequired,
	vendorId: PropTypes.number.isRequired,
	refreshSelected: PropTypes.func.isRequired,
};
