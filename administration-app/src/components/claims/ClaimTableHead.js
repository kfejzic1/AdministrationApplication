import PropTypes from 'prop-types';
import { Box, TableCell, TableHead, TableRow, TableSortLabel, Checkbox } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { createTheme, ThemeProvider } from "@mui/material/styles";
const headCells = [
	{
		id: 'id',
		visible: true,
		numeric: false,
		disablePadding: false,
		label:'Id'
	},
	{
		id: 'subject',
		visible: true,
		numeric: false,
		disablePadding: false,
		label:'Subject'
	},
    {
        id: 'last modified',
        visible: true,
        numeric: false,
        disablePadding: false,
        label: 'Last updated'
    },
    {
        id: 'status',
        visible: true,
        numeric: false,
        disablePadding: false,
        label: 'Status'
    }
];

const tableTheme = createTheme({
	palette: {
	  primary: {
		main: "#E7EBF0",
	  },
	  secondary: {
		main: "#ffe2b6",
	  },
	  secondary2: {
		main: "#ffaf36",
	  },
	},
  });

export default function ClaimTableHead(props) {
	const {order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<ThemeProvider theme={tableTheme}>
		<TableHead>
			<TableRow>
				{/*
				<TableCell padding='checkbox'>
					<Checkbox
						color='secondary2'
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all vendors',
						}}
					/>
				</TableCell>
					*/}
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
						>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
		</ThemeProvider>
	);
}

ClaimTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	//onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};
