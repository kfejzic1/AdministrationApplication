import { DesktopDatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import Slider from '@mui/material/Slider';
import * as React from 'react';
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
	const [dateStartFilter, setDateStartFilter] = useState('');
	const [dateEndFilter, setDateEndFilter] = useState('');
	const [recipientFilter, setRecipientFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	const [amountMax, setAmountMax] = useState(arg.max);
	useEffect(() => {
		setAmountMax(arg.max);
		if (arg.max < value1[1] && arg.max < value1[0]) setValue1([0, arg.max]);
		else if (arg.max < value1[1]) setValue1([value1[0], arg.max]);
	}, [arg.max]);
	useEffect(() => {
		updateFilterOptions();
	}, [sortingColumn, sortingDirection]);

	const updateFilterOptions = () => {
		if (amountMax == value1[1] && 0 == value1[0])
			arg.setFilterOptions({
				Recipient: recipientFilter,
				Status: statusFilter,
				DateTimeStart: dateStartFilter,
				DateTimeEnd: dateEndFilter,
				MinAmount: '',
				MaxAmount: '',
				SortingOptions: sortingColumn,
				Ascending: sortingDirection == 'asc' ? true : false,
			});
		else
			arg.setFilterOptions({
				Recipient: recipientFilter,
				Status: statusFilter,
				DateTimeStart: dateStartFilter,
				DateTimeEnd: dateEndFilter,
				MinAmount: value1[0],
				MaxAmount: value1[1],
				SortingOptions: sortingColumn,
				Ascending: sortingDirection == 'asc' ? true : false,
			});
	};

	const [sortDirectionDate, setSortDirectionDate] = useState('asc');
	const [sortDirectionRecipient, setSortDirectionRecipient] = useState('asc');
	const [sortDirectionAmount, setSortDirectionAmount] = useState('asc');
	const [sortDirectionStatus, setSortDirectionStatus] = useState('asc');

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
	//min max slider

	const minDistance = 5;
	const [value1, setValue1] = React.useState([0, amountMax]);

	const handleChange1 = (event, newValue, activeThumb) => {
		console.log('Setting');
		if (!Array.isArray(newValue)) {
			return;
		}

		if (activeThumb === 0) {
			setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
		} else {
			setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
		}
	};

	//end of min max slider
	return (
		<TableHead>
			<TableRow>
				<TableCell>
					<Typography variant='h6'>ID</Typography>
				</TableCell>
				<TableCell align='center'>
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
				<TableCell align='center'>
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
				<TableCell align='center'>
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
				<TableCell align='center'>
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
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								gap: 2,
								justifyContent: 'center',
							}}
						>
							<DesktopDatePicker
								label='Start'
								sx={{ width: 'auto' }}
								maxDate={dateEndFilter}
								onChange={a => {
									setDateStartFilter(a);
								}}
							></DesktopDatePicker>
							<DesktopDatePicker
								minDate={dateStartFilter}
								onChange={a => {
									setDateEndFilter(a);
								}}
								label='End'
							></DesktopDatePicker>
						</Box>
					</LocalizationProvider>
				</TableCell>

				<TableCell>
					<TextField
						value={recipientFilter}
						onChange={e => {
							setRecipientFilter(e.target.value);
						}}
					></TextField>
				</TableCell>
				<TableCell>
					<Box>
						<Box sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
							<Typography>Min: {value1[0]}</Typography>
							<Typography>Max: {value1[1]}</Typography>
						</Box>
						<Slider
							getAriaLabel={() => 'Minimum distance'}
							value={value1}
							min={0}
							max={amountMax}
							onChange={handleChange1}
							valueLabelDisplay='auto'
							getAriaValueText={a => a}
							disableSwap
						/>
					</Box>
				</TableCell>
				<TableCell>
					<FormControl fullWidth>
						<Select
							labelId='filter-status-label'
							id='filter-status'
							value={statusFilter}
							displayEmpty
							onChange={e => {
								setStatusFilter(e.target.value);
							}}
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
								setDateStartFilter('');
								setDateEndFilter('');
								setValue1([0, amountMax]);
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
