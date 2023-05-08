import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
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
	Modal
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ClaimTableHead from './ClaimTableHead'
import Loader from '../loaderDialog/Loader';
import ClaimTableToolbar from './ClaimTableToolbar';
import ClaimModal from './claimModal/ClaimModal';
import { getUserClaims } from '../../services/transactionClaimService';

const theme = createTheme({
	components: {
		MuiSwitch: {
			styleOverrides: {
				switchBase: {
					// Controls default (unchecked) color for the thumb
					color: '#ccc',
				},
				colorPrimary: {
					'&.Mui-checked': {
						// Controls checked color for the thumb
						color: '#ffaf36',
					},
				},
				track: {
					// Controls default (unchecked) color for the track
					opacity: 0.2,
					backgroundColor: '#c1bfbf',
					'.Mui-checked.Mui-checked + &': {
						// Controls checked color for the track
						opacity: 0.7,
						backgroundColor: '#ffc976',
					},
				},
			},
		},
	},
});

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
	root: {
		'& .MuiTableBody-root .Mui-selectedUserIds, & .MuiTableBody-root .Mui-selectedUserIds:hover': {
			'& .MuiTableBody-root .Mui-selectedUserIds:hover': {
				backgroundColor: '#ffc976',
			},
			backgroundColor: '#ffe2b6',
			'& .MuiChip-root': {
				backgroundColor: '#ffaf36',
			},
		},

		'& .MuiTableBody-root .Mui-selectedUserIds:hover': {
			backgroundColor: '#ffc976',
		},

		button: {
			marginRight: '20px',
			'&.MuiButton-outlined': {
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
		},
	},
});

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export default function ClaimTable() {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [dense, setDense] = useState(false);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const params = useParams();
	const [claims, setClaims] = useState([]);
	const [selectedId, setSelectedId] = useState(0);
	const [openClaim, setOpenClaim] = useState(false);
	const handleOpenClaim = () => setOpenClaim(true);
	const handleCloseClaim = () => setOpenClaim(false);
	
	const fetchData = async () => {
		getUserClaims().then(res => {
			setClaims(res.data);
		});
		// MOCK:
		//setClaims([{transactionId: 1, status:'OPEN', modified: 'Juce', subject: 'Nije proso cener'},{id: 2, status:'OPEN', modified: 'Danas', subject: 'Nije prosla cvaja'}])
	}

	useEffect(() => {
		 fetchData();
	}, []);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleClick = (event, id) => {
		setSelectedId(id);
		handleOpenClaim();
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = event => {
		setDense(event.target.checked);
	};

	const isSelected = id => selected.indexOf(id) !== -1;
	const classes = useStyles();
	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - claims.length) : 0;

	return (
		<Box sx={{ height: '500px' }}>
			<Box sx={{ width: '97%', margin: 'auto', pt: '1%' }}>
				<Paper sx={{ width: '100%', mb: 2, border: 'none' }} elevation={2}>
					<ClaimTableToolbar/>
					<ThemeProvider theme={tableTheme}>
						<TableContainer>
							<Table
								className={classes.root}
								sx={{ minWidth: '90%' }}
								aria-labelledby='tableTitle'
								size={dense ? 'small' : 'medium'}>
								<ClaimTableHead
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									//onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={claims.length}
								/>
								<TableBody>
									{stableSort(claims, getComparator(order, orderBy))
										.slice(page * rowsPerPage, (page + 1) * rowsPerPage * rowsPerPage)
										.map((row, index) => {
											const isItemSelected = isSelected(row.transactionId);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow
													classes={{
														root: classes.tableRowRoot,
														selected: classes.tableRowSelected,
													}}
													hover
													onClick={event => handleClick(event, row.id)}
													//role='checkbox'
													aria-checked={isItemSelected}
													tabIndex={-1}
													key={row.transactionId}
													selected={isItemSelected}
													sx={{ cursor: 'pointer' }}>
													<TableCell component='th' id={labelId} scope='row'>{row.id}</TableCell>
													<TableCell align='left'>{row.subject}</TableCell>
													<TableCell align='left'>{row.modified===null?row.created.split("T")[0]:row.modified.split("T")[0]}</TableCell>
													<TableCell align='left'>{row.status}</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow
											classes={{
												root: classes.tableRowRoot,
												selected: classes.tableRowSelected,
											}}
											style={{
												height: (dense ? 33 : 53) * emptyRows,
											}}>
											<TableCell colSpan={5} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</ThemeProvider>
					<TablePagination
						rowsPerPageOptions={[10, 25, 50, 100]}
						component='div'
						count={claims.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
					<ThemeProvider theme={theme}>
						<FormControlLabel
							className={classes.FormControlLabel}
							sx={{ color: 'black', margin: '10px' }}
							control={<Switch checked={dense} onChange={handleChangeDense} />}
							label='Dense padding'
						/>
					</ThemeProvider>
				</Paper>
			</Box>
			<Modal
				open = {openClaim}
				onClose ={handleCloseClaim}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
					<ClaimModal handleClose = {handleCloseClaim} claimId = {selectedId}/> 
			</Modal>
		</Box>
	);
}
