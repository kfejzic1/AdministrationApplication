import { useState, useEffect } from 'react';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
		'& .MuiTableBody-root .Mui-selected, & .MuiTableBody-root .Mui-selected:hover': {
			'& .MuiTableBody-root .Mui-selected:hover': {
				backgroundColor: '#ffc976',
			},
			backgroundColor: '#ffe2b6',
			'& .MuiChip-root': {
				backgroundColor: '#ffaf36',
			},
		},

		'& .MuiTableBody-root .Mui-selected:hover': {
			backgroundColor: '#ffc976',
		},
		'& .css-177gid-MuiTableCell-root': {
			padding: '10px',
		},
	},

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

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export default function ClaimDocumentTable(props) {
	const [documents, setDocuments] = useState([]);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const [selected, setSelected] = useState([]);

	const [documentsAdd, setDocumentsAdd] = useState([]);
	const [page, setPage] = useState(0);
	const [dense, setDense] = useState(false);
	const [rowsPerPage, setRowsPerPage] = useState(25);

	useEffect(() => {
		setDocuments(props.documents);
	}, [props.documents]);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleClick = (event, row) => {
		let url = row.unc.split('/');
		let pos = url.indexOf('transactions');
		url = url.slice(pos);
		let urlF = '';
		url.forEach(el=>{
			urlF += '/'+el;
		});
		window.open(encodeURI(`http://siprojekat.duckdns.org:8081${urlF}`));
	};

	const isSelected = id => selected.indexOf(id) !== -1;
	const classes = useStyles();
	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - documents.length) : 0;

	return (
		<Box sx={{ margin: 'auto', pt: '5px', mt: '5px' }}>
			<Paper sx={{ width: '100%', mb: 2, border: 'none' }}>
				<ThemeProvider theme={tableTheme}>
					<TableContainer>
						<Table
							className={classes.root}
							sx={{ minWidth: '100%' }}
							aria-labelledby='tableTitle'
							size={'small'}>
							<TableBody>
								{documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const isItemSelected = isSelected(row.id);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												classes={{
													root: classes.tableRowRoot,
													selected: classes.tableRowSelected,
												}}
												hover
												onClick={event => handleClick(event, row)}
												role='checkbox'
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row.id}
												selected={isItemSelected}
												sx={{ cursor: 'pointer' }}>
												<TableCell align='left'>{row.fileName}</TableCell>
												<TableCell align='left'>{row.extension}</TableCell>
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
			</Paper>
		</Box>
	);
}
