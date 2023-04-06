import { DesktopDatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SwapVertSharpIcon from '@mui/icons-material/SwapVertSharp';
import IconButton from '@mui/material/IconButton';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useEffect, useState } from 'react';
import { Box, Button, TableCell, TableRow, TableHead, Input, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';

export default function TransactionsListHeader(arg) {
	const [sortingColumn, setSortingColumn] = useState('');
	const [sortingDirection, setSortingDirection] = useState('asc');
	const [idFilter, setIdFilter] = useState('');
	const [dateStartFilter, setDateStartFilter] = useState('');
	const [dateEndFilter, setDateEndFilter] = useState('');
	const [timeStartFilter, setTimeStartFilter] = useState('00:00:00');
	const [timeEndFilter, setTimeEndFilter] = useState('00:00:00');
	const [recipientFilter, setRecipientFilter] = useState('');
	const [amountFilterStart, setAmountFilterStart] = useState('');
	const [amountFilterEnd, setAmountFilterEnd] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	var textFieldAmountStart = '';
	var textFieldAmountEnd = '';

	const [styleErrorStart, setStyleErrorStart] = useState('black'); // it's used for border color for TextField "Amout" when wrong value is inputed
	const [styleErrorEnd, setStyleErrorEnd] = useState('black');

	const [sortDirectionId, setSortDirectionId] = useState('asc');
	const [sortDirectionDate, setSortDirectionDate] = useState('asc');
	const [sortDirectionRecipient, setSortDirectionRecipient] = useState('asc');
	const [sortDirectionAmount, setSortDirectionAmount] = useState('asc');
	const [sortDirectionStatus, setSortDirectionStatus] = useState('asc');

	const [isValidAmountStart, setValidAmountStart] = useState(true);
	const [isValidAmountEnd, setValidAmountEnd] = useState(true);

	const [startDateClass, setStartDateClass] = useState('');
	const [endDateClass, setEndDateClass] = useState('');

	const [startTimeClass, setStartTimeClass] = useState('');
	const [endTimeClass, setEndTimeClass] = useState('');

	useEffect(() => {
		console.log('useEffect');
		updateFilterOptions();
	}, [sortingColumn, sortingDirection]);
	const updateFilterOptions = () => {
		var startDate1 = dateStartFilter + 'T' + timeStartFilter;
		console.log('updateFilterOptions', startDate1);
		if (startDate1.length < 15) startDate1 = '';
		var endDate1 = dateEndFilter + 'T' + timeEndFilter;
		if (endDate1.length < 15) endDate1 = '';
		if (parseFloat(amountFilterEnd) < parseFloat(amountFilterStart))
			alert('Ending value cannot be lower then starting value');
		else {
			arg.setFilterOptions({
				Recipient: recipientFilter,
				Status: statusFilter,
				DateTimeStart: dateStartFilter,
				DateTimeEnd: dateEndFilter,
				MinAmount: amountFilterStart,
				MaxAmount: amountFilterEnd,
				SortingOptions: sortingColumn,
				Ascending: sortingDirection == 'asc' ? true : false,
			});
		}
	};
	const handleSortDirectionIdChange = () => {
		const newSortDirection = sortDirectionId === 'asc' ? 'desc' : 'asc';
		setSortDirectionId(newSortDirection);
		updateFilterOptions();
	};

	const handleSortDirectionDateChange = () => {
		const newSortDirection = sortDirectionDate === 'asc' ? 'desc' : 'asc';
		setSortDirectionDate(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('DateTime');
		updateFilterOptions();
	};

	const handleSortDirectionRecipientChange = () => {
		var newSortDirection = 'asc';
		var k = sortDirectionRecipient;
		if (k.includes('a')) {
			newSortDirection = 'desc';
		}
		setSortDirectionRecipient(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('Recipient');
		updateFilterOptions();
	};

	const handleSortDirectionAmountChange = () => {
		const newSortDirection = sortDirectionAmount === 'asc' ? 'desc' : 'asc';
		setSortDirectionAmount(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('Amount');
		updateFilterOptions();
	};

	const handleSortDirectionStatusChange = () => {
		const newSortDirection = sortDirectionStatus === 'asc' ? 'desc' : 'asc';
		setSortDirectionStatus(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('Status');
		updateFilterOptions();
	};

	const handleIdFilterChange = event => {
		setIdFilter(event.target.value);
	};

	const handleDateStartFilterChange = event => {
		const startDate = new Date(event.target.value);
		const endDate = new Date(dateEndFilter);

		if (
			new Date(startDate + 'T' + timeStartFilter) > new Date(endDate + 'T' + timeEndFilter) &&
			event.target.value != ''
		) {
			alert('Starting date cannot be higher than ending date');
			setStartDateClass('invalidDateStart');
		} else {
			setDateStartFilter(event.target.value);
			setStartDateClass('datePickerStart');
		}
	};

	const handleDateEndFilterChange = event => {
		const startDate = new Date(dateStartFilter);
		const endDate = new Date(event.target.value);
		if (
			new Date(startDate + 'T' + timeStartFilter) > new Date(endDate + 'T' + timeEndFilter) &&
			event.target.value != ''
		) {
			alert('Starting date cannot be higher than ending date');
			setEndDateClass('invalidDateEnd');
		} else {
			setDateEndFilter(event.target.value);
			setEndDateClass('datePickerEnd');
		}
	};

	const handleTimeStartFilterChange = event => {
		const startTime = event.target.value;
		const endTime = timeEndFilter;

		if (
			new Date(dateStartFilter + 'T' + startTime) > new Date(dateEndFilter + 'T' + endTime) &&
			endTime != '' &&
			startTime != ''
		) {
			alert('Starting time cannot be highter then ending date');
			setStartTimeClass('invalidTimeStart');
		} else {
			setTimeStartFilter(event.target.value);
			setStartTimeClass('timePickerStart');
		}
	};

	const handleTimeEndFilterChange = event => {
		const startTime = timeStartFilter;
		const endTime = event.target.value;
		console.log('start=', startTime, endTime);
		if (
			new Date(dateStartFilter + 'T' + startTime) > new Date(dateEndFilter + 'T' + endTime) &&
			endTime != '' &&
			startTime != ''
		) {
			alert('Starting time cannot be highter then ending date');
			setEndTimeClass('invalidTimeStart');
		} else {
			setTimeEndFilter(event.target.value);
			setEndTimeClass('timePickerEnd');
		}
	};

	const handleRecipientFilterChange = event => {
		setRecipientFilter(event.target.value);
	};

	const handleStatusFilterChange = event => {
		setStatusFilter(event.target.value);
	};

	const clearIdFilter = () => {
		setIdFilter('');
	};

	const clearDateStartFilter = () => {
		setDateStartFilter('');
	};

	const clearDateEndFilter = () => {
		setDateEndFilter('');
	};

	const clearRecipientFilter = () => {
		setRecipientFilter('');
	};

	/*const styles = theme => ({
		textField: {
			width: '90%',
			marginLeft: 'auto',
			mainRight: 'auto',
			color: 'white',
			paddingBottom: 0,
			marginTop: 0,
			fontWeight: 500,
		},
	});*/

	return (
		<TableHead>
			<TableRow>
				<TableCell>
					<Typography variant='h6'>ID</Typography>
				</TableCell>
				<TableCell>
					{sortingColumn != 'DateTime' ? (
						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
							<Typography variant='h6'>Date</Typography>
							<SwapVertSharpIcon
								sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
								onClick={() => {
									setSortingColumn('DateTime');
									setSortingDirection('asc');
								}}
							/>
						</Box>
					) : (
						<TableSortLabel
							direction={sortDirectionDate}
							onClick={handleSortDirectionDateChange}
							sx={{
								'& .MuiTableSortLabel-icon': {
									color: 'black !important',
								},
							}}
							hideSortIcon={false}
							active={true}
						>
							<Typography variant='h6'>Date</Typography>
						</TableSortLabel>
					)}
				</TableCell>
				<TableCell>
					{sortingColumn != 'Recipient' ? (
						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
							<Typography variant='h6'>Recipient</Typography>
							<SwapVertSharpIcon
								sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
								onClick={() => {
									setSortingColumn('Recipient');
									setSortingDirection('asc');
									setSortDirectionAmount('asc');
								}}
							/>
						</Box>
					) : (
						<TableSortLabel
							direction={sortDirectionRecipient}
							onClick={handleSortDirectionRecipientChange}
							sx={{
								'& .MuiTableSortLabel-icon': {
									color: 'black !important',
								},
							}}
							hideSortIcon={false}
							active={true}
						>
							<Typography variant='h6'>Recipient</Typography>
						</TableSortLabel>
					)}
				</TableCell>
				<TableCell>
					{sortingColumn != 'Amount' ? (
						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
							<Typography variant='h6'>Amount </Typography>
							<SwapVertSharpIcon
								sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
								onClick={() => {
									setSortingDirection('asc');
									setSortDirectionAmount('asc');
									setSortingColumn('Amount');
								}}
							/>
						</Box>
					) : (
						<TableSortLabel
							direction={sortDirectionAmount}
							onClick={handleSortDirectionAmountChange}
							sx={{
								'& .MuiTableSortLabel-icon': {
									color: 'black !important',
								},
							}}
							hideSortIcon={false}
							active={true}
						>
							<Typography variant='h6'>Amount</Typography>
						</TableSortLabel>
					)}
				</TableCell>
				<TableCell>
					{sortingColumn != 'Status' ? (
						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
							<Typography variant='h6'>Status </Typography>
							<SwapVertSharpIcon
								sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
								onClick={() => {
									setSortingColumn('Status');
									setSortingDirection('asc');
								}}
							/>
						</Box>
					) : (
						<TableSortLabel
							direction={sortDirectionStatus}
							onClick={handleSortDirectionStatusChange}
							sx={{
								'& .MuiTableSortLabel-icon': {
									color: 'black !important',
								},
							}}
							hideSortIcon={false}
							active={true}
						>
							<Typography variant='h6'>Status</Typography>
						</TableSortLabel>
					)}
				</TableCell>
				<TableCell></TableCell>
			</TableRow>

			<TableRow>
				<TableCell></TableCell>
				<TableCell>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
							<DesktopDatePicker
								label='Start'
								onChange={a => {
									console.log(JSON.stringify(a));
									setDateStartFilter(JSON.stringify(a));
								}}
							></DesktopDatePicker>
							<DesktopDatePicker
								onChange={a => {
									console.log(JSON.stringify(a));
									setDateEndFilter(JSON.stringify(a));
								}}
								label='End'
							></DesktopDatePicker>
						</Box>
					</LocalizationProvider>
				</TableCell>

				<TableCell>
					<TextField
						value={recipientFilter}
						onChange={handleRecipientFilterChange}
						InputProps={{
							endAdornment: (
								<IconButton onClick={clearRecipientFilter}>
									<ClearIcon />
								</IconButton>
							),
						}}
					></TextField>
				</TableCell>
				<TableCell>
					<Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
						<TextField
							label='Min'
							variant='outlined'
							type='number'
							onChange={event => setAmountFilterStart(event.target.value)}
						></TextField>
						<TextField
							label='Max'
							variant='outlined'
							type='number'
							onChange={event => setAmountFilterEnd(event.target.value)}
						></TextField>
					</Box>
				</TableCell>
				<TableCell>
					<FormControl fullWidth>
						<Select
							labelId='filter-status-label'
							id='filter-status'
							value={statusFilter}
							displayEmpty
							onChange={handleStatusFilterChange}
						>
							<MenuItem value='Processing'>Processing</MenuItem>
							<MenuItem value='Pending'>Pending</MenuItem>
							<MenuItem value='Success'>Success</MenuItem>
							<MenuItem value='Failure'> Failure</MenuItem>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
						</Select>
					</FormControl>
				</TableCell>
				<TableCell>
					<Box display={'flex'} gap={3} justifyContent={'center'}>
						<Button
							onClick={() => {
								updateFilterOptions();
							}}
						>
							Click to filter
						</Button>
						<Button
							onClick={() => {
								setRecipientFilter('');
								setStatusFilter('');
								setDateStartFilter('T');
								setDateEndFilter('T');
								setAmountFilterStart('');
								setAmountFilterEnd('');
								setSortingDirection('asc');
								setSortingColumn('DateTime');
								arg.setFilterOptions({
									Recipient: '',
									Status: '',
									DateTimeStart: '',
									DateTimeEnd: '',
									MinAmount: '',
									MaxAmount: '',
									SortingOptions: 'DateTime',
									Ascending: 'asc',
								});
							}}
						>
							Restart filter
						</Button>
					</Box>
				</TableCell>
			</TableRow>
		</TableHead>
	);
}
