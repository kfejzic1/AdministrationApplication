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
	const [dateStartFilter, setDateStartFilter] = useState(null);
	const [dateEndFilter, setDateEndFilter] = useState(null);
	const [recipientFilter, setRecipientFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	const [amountMin, setAmountMin] = useState('');
	const [amountMax, setAmountMax] = useState('');

	useEffect(() => {
		updateFilterOptions();
	}, [sortingColumn, sortingDirection]);

	const updateFilterOptions = () => {
		arg.setFilterOptions({
			Recipient: recipientFilter,
			Status: statusFilter,
			DateTimeStart: dateStartFilter,
			DateTimeEnd: dateEndFilter,
			MinAmount: amountMin,
			MaxAmount: amountMax,
			SortingOptions: sortingColumn,
			Ascending: sortingDirection == 'asc' ? true : false,
		});
	};

	const [sortDirectionDate, setSortDirectionDate] = useState('asc');
	const [sortDirectionRecipient, setSortDirectionRecipient] = useState('asc');
	const [sortDirectionAmount, setSortDirectionAmount] = useState('asc');
	const [sortDirectionCategory, setSortDirectionCategory] = useState('asc');
	const [sortDirectionCurrency, setSortDirectionCurrency] = useState('asc');

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

	const handleSortDirectionCurrencyChange = () => {
		const newSortDirection = sortDirectionCurrency === 'asc' ? 'desc' : 'asc';
		setSortDirectionCurrency(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('Status');
		updateFilterOptions();
	};

	const handleSortDirectionCategoryChange = () => {
		const newSortDirection = sortDirectionCategory === 'asc' ? 'desc' : 'asc';
		setSortDirectionCategory(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('Status');
		updateFilterOptions();
	};

	//end of min max slider
	return (
		<TableHead>
			<TableRow>
				<TableCell align='center' sx={{ width: '23%' }}>
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
				<TableCell align='center' sx={{ width: '25%' }}>
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
				<TableCell align='center' sx={{ width: '20%' }}>
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
				<TableCell align='center' sx={{ width: '10%' }}>
					{sortingColumn != 'Currency' ? (
						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
							<Typography variant='h6'>Currency</Typography>
							<SwapVertSharpIcon
								sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
								onClick={() => {
									setSortingColumn('Currency');
									setSortingDirection('asc');
								}}
							/>
						</Box>
					) : (
						<TableSortLabel
							direction={sortDirectionCurrency}
							onClick={handleSortDirectionCurrencyChange}
							sx={{
								'& .MuiTableSortLabel-icon': {
									color: 'black !important',
								},
							}}
							hideSortIcon={false}
							active={true}
						>
							<Typography variant='h6'>Currency</Typography>
						</TableSortLabel>
					)}
				</TableCell>
				<TableCell align='center' sx={{ width: '15%' }}>
					{sortingColumn != 'Category' ? (
						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
							<Typography variant='h6'>Category</Typography>
							<SwapVertSharpIcon
								sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
								onClick={() => {
									setSortingColumn('Category');
									setSortingDirection('asc');
								}}
							/>
						</Box>
					) : (
						<TableSortLabel
							direction={sortDirectionCategory}
							onClick={handleSortDirectionCategoryChange}
							sx={{
								'& .MuiTableSortLabel-icon': {
									color: 'black !important',
								},
							}}
							hideSortIcon={false}
							active={true}
						>
							<Typography variant='h6'>Category</Typography>
						</TableSortLabel>
					)}
				</TableCell>
				<TableCell sx={{ width: '7%' }}></TableCell>
			</TableRow>

			<TableRow>
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
								value={dateStartFilter}
								onChange={a => {
									setDateStartFilter(a);
								}}
							></DesktopDatePicker>
							<DesktopDatePicker
								minDate={dateStartFilter}
								value={dateEndFilter}
								onChange={a => {
									setDateEndFilter(a);
								}}
								label='End'
							></DesktopDatePicker>
						</Box>
					</LocalizationProvider>
				</TableCell>

				<TableCell align='center'>
					<TextField
						value={recipientFilter}
						fullWidth={true}
						onChange={e => {
							setRecipientFilter(e.target.value);
						}}
					></TextField>
				</TableCell>
				<TableCell>
					<Box>
						<Box sx={{ flexDirection: 'row', display: 'flex', gap: 2, justifyContent: 'space-between' }}>
							<TextField
								type='number'
								value={amountMin}
								onChange={e => {
									setAmountMin(e.target.value);
								}}
								placeholder='Min'
							></TextField>
							<TextField
								type='number'
								value={amountMax}
								onChange={e => {
									setAmountMax(e.target.value);
								}}
								placeholder='Max'
							></TextField>
						</Box>
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
							<MenuItem value='EUR'>EUR</MenuItem>
							<MenuItem value='USD'>USD</MenuItem>
							<MenuItem value='BAM'>BAM</MenuItem>
							<MenuItem value='JPY'>JPY</MenuItem>
							<MenuItem value='GBP'>GBP</MenuItem>
							<MenuItem value='CAD'>CAD</MenuItem>
							<MenuItem value='AUD'>AUD</MenuItem>
							<MenuItem value='CHF'>CHF</MenuItem>
							<MenuItem value='CNY'>CNY</MenuItem>
							<MenuItem value='NZD'>NZD</MenuItem>
							<MenuItem value='MXN'>MXN</MenuItem>
							<MenuItem value='BRL'>BRL</MenuItem>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
						</Select>
					</FormControl>
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
					<Box display={'flex'} gap={1} flexDirection={'column'} justifyContent={'center'}>
						<Button
							onClick={() => {
								const regex = /^\d*\.?\d+$/;
								if (
									amountMax.includes('e') ||
									amountMin.includes('e') ||
									amountMax.includes('+') ||
									amountMin.includes('+') ||
									parseInt(amountMax) < 0 ||
									parseInt(amountMin) < 0 ||
									parseInt(amountMax) < parseInt(amountMin) ||
									(parseInt(amountMin) == '' && parseInt(amountMax) !== '')
								)
									alert('Invalid amount filter value!');
								else updateFilterOptions();
							}}
						>
							Filter
						</Button>
						<Button
							onClick={() => {
								setRecipientFilter('');
								setStatusFilter('');
								setDateStartFilter(null);
								setDateEndFilter(null);
								setAmountMin('');
								setAmountMax('');
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
							Restart
						</Button>
					</Box>
				</TableCell>
			</TableRow>
		</TableHead>
	);
}
