import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	Snackbar,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	FormControlLabel,
	Switch,
	Paper,
	Tooltip,
	Toolbar,
} from '@mui/material';
import { Alert } from '@mui/material';
import { Stack } from '@mui/system';

import CreateIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const headCells = [
	{
		id: 'voucher',
		visible: true,
		numeric: false,
		disablePadding: true,
		label: 'Id',
	},
	{
		id: 'one-time code',
		numeric: false,
		disablePadding: false,
		label: 'One-time code',
	},
	{
		id: 'amount',
		numeric: false,
		disablePadding: false,
		label: 'Amount',
	},
	{
		id: 'currency',
		numeric: false,
		disablePadding: false,
		label: 'Currency',
	},
	
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'Status',
	},
	
];

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
}));

export default function UsersTableHead() {
	const classes = useStyles();
	return (
		<ThemeProvider theme={tableTheme}>
			<TableHead>
				<TableRow>
					{headCells.map(headCell => (
						<TableCell
							key={headCell.id}
							align={headCell.numeric ? 'right' : 'left'}
							padding={headCell.disablePadding ? 'none' : 'normal'}
							width={headCell.label === 'Id' ? '4%' : '15%'}
						>
							{headCell.label === 'Id' ? '' : headCell.label}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		</ThemeProvider>
	);
}
