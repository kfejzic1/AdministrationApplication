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
	const [sortingColumn, setSortingColumn] = useState('createdat');
	const [sortingDirection, setSortingDirection] = useState('desc');
	const [dateStartFilter, setDateStartFilter] = useState(null);
	const [dateEndFilter, setDateEndFilter] = useState(null);
	const [recipientFilter, setRecipientFilter] = useState('');
	const [currencyFilter, setCurrencyFilter] = useState('');
	const [typeFilter, setTypeFilter] = useState('');
	const [amountMin, setAmountMin] = useState('');
	const [amountMax, setAmountMax] = useState('');
	const [groupByValue, setGroupByValue] = useState(arg.groupBy);
	console.log('header ', arg.groupBy);
	useEffect(() => {
		updateFilterOptions();
	}, [sortingColumn, sortingDirection]);
	useEffect(() => {
		setGroupByValue(arg.groupBy);
		console.log('group by effect', arg.groupBy);
	}, [arg.groupBy]);
	const updateFilterOptions = () => {
		arg.setFilterOptions({
			CreatedAtStartFilter: dateStartFilter,
			CreatedAtEndFilter: dateEndFilter,
			AmountStartFilter: amountMin,
			AmountEndFilter: amountMax,
			CurrencyFilter: currencyFilter,
			TransactionTypeFilter: typeFilter,
			RecipientNameFilter: recipientFilter,
			sortingOrder: sortingColumn + sortingDirection,
		});
	};

	const [sortDirectionDate, setSortDirectionDate] = useState('desc');
	const [sortDirectionRecipient, setSortDirectionRecipient] = useState('desc');
	const [sortDirectionAmount, setSortDirectionAmount] = useState('desc');
	const [sortDirectionType, setSortDirectionType] = useState('desc');
	const [sortDirectionCurrency, setSortDirectionCurrency] = useState('desc');

	const handleSortDirectionDateChange = () => {
		console.log('datum semjenja i voava22222');
		const newSortDirection = sortDirectionDate === 'asc' ? 'desc' : 'asc';
		setSortDirectionDate(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('createdat');
		//	updateFilterOptions();
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
		//	updateFilterOptions();
	};

	const handleSortDirectionAmountChange = () => {
		const newSortDirection = sortDirectionAmount === 'asc' ? 'desc' : 'asc';
		setSortDirectionAmount(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('Amount');
		//updateFilterOptions();
	};

	const handleSortDirectionCurrencyChange = () => {
		const newSortDirection = sortDirectionCurrency === 'asc' ? 'desc' : 'asc';
		setSortDirectionCurrency(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('Currency');
		//updateFilterOptions();
	};

	const handleSortDirectionTypeChange = () => {
		const newSortDirection = sortDirectionType === 'asc' ? 'desc' : 'asc';
		setSortDirectionType(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('Type');
		//updateFilterOptions();
	};

	//end of min max slider
	return (
		<TableHead>
			<TableRow>
				<TableCell align='center' sx={{ width: '11%' }}>
					<Typography variant='h6'>Group by</Typography>
				</TableCell>
				<TableCell align='center' sx={{ width: '20%' }}>
					{sortingColumn != 'createdat' ? (
						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
							<Typography variant='h6'>Date</Typography>
							<SwapVertSharpIcon
								sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
								onClick={() => {
									console.log('datum semjenja i voava');
									setSortingColumn('createdat');
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
				<TableCell align='center' sx={{ width: '20%' }}>
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
				<TableCell align='center' sx={{ width: '13%' }}>
					{sortingColumn != 'Type' ? (
						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
							<Typography variant='h6'>Type</Typography>
							<SwapVertSharpIcon
								sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
								onClick={() => {
									setSortingColumn('Type');
									setSortingDirection('asc');
								}}
							/>
						</Box>
					) : (
						<TableSortLabel
							direction={sortDirectionType}
							onClick={handleSortDirectionTypeChange}
							sx={{
								'& .MuiTableSortLabel-icon': {
									color: 'black !important',
								},
							}}
							hideSortIcon={false}
							active={true}
						>
							<Typography variant='h6'>Type</Typography>
						</TableSortLabel>
					)}
				</TableCell>
				<TableCell sx={{ width: '7%' }}></TableCell>
			</TableRow>

			<TableRow>
				<TableCell>
					<FormControl fullWidth>
						<Select
							labelId='filter-status-label'
							id='filter-status'
							displayEmpty
							value={arg.groupBy}
							onChange={e => {
								arg.setGroupBy(e.target.value);
								setGroupByValue(e.target.value);
								//restart filter
								setRecipientFilter('');
								setDateStartFilter(null);
								setDateEndFilter(null);
								setAmountMin('');
								setAmountMax('');
								setTypeFilter('');
								setCurrencyFilter('');
								setSortingDirection('desc');
								setSortingColumn('createdat');
								arg.setFilterOptions({
									CreatedAtStartFilter: '',
									CreatedAtEndFilter: '',
									AmountStartFilter: '',
									AmountEndFilter: '',
									CurrencyFilter: '',
									TransactionTypeFilter: '',
									RecipientNameFilter: '',
									sortingOrder: 'createdatdesc',
								});
							}}
						>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
							<MenuItem value='Currency'>Currency</MenuItem>
							<MenuItem value='Type'>Type</MenuItem>
						</Select>
					</FormControl>
				</TableCell>
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
							value={currencyFilter}
							displayEmpty
							onChange={e => {
								setCurrencyFilter(e.target.value);
							}}
						>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
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
						</Select>
					</FormControl>
				</TableCell>
				<TableCell>
					<FormControl fullWidth>
						<Select
							labelId='filter-status-label'
							id='filter-status'
							value={typeFilter}
							displayEmpty
							onChange={e => {
								setTypeFilter(e.target.value);
							}}
						>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
							<MenuItem value='B2B'>B2B</MenuItem>
							<MenuItem value='C2B'>C2B</MenuItem>
							<MenuItem value='C2C'>C2C</MenuItem>
						</Select>
					</FormControl>
				</TableCell>

				<TableCell>
					<Box display={'flex'} gap={1} flexDirection={'column'} justifyContent={'center'}>
						<Button
							onClick={() => {
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
								else {
									updateFilterOptions();
									setGroupByValue('');
									arg.setGroupBy('');
								}
							}}
						>
							Filter
						</Button>
						<Button
							onClick={() => {
								//restart filter
								setRecipientFilter('');
								setDateStartFilter(null);
								setDateEndFilter(null);
								setAmountMin('');
								setAmountMax('');
								setTypeFilter('');
								setCurrencyFilter('');
								setSortingDirection('desc');
								setSortingColumn('createdat');
								arg.setFilterOptions({
									CreatedAtStartFilter: '',
									CreatedAtEndFilter: '',
									AmountStartFilter: '',
									AmountEndFilter: '',
									CurrencyFilter: '',
									TransactionTypeFilter: '',
									RecipientNameFilter: '',
									sortingOrder: 'createdatdesc',
								});
								arg.setGroupBy('');
								setGroupByValue('');
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
