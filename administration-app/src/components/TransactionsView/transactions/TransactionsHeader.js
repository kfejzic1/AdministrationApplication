import cn from '../css/TransactionsHeader.module.css';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SwapVertSharpIcon from '@mui/icons-material/SwapVertSharp';
import IconButton from '@mui/material/IconButton';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useEffect, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
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
				DateTimeStart: startDate1,
				DateTimeEnd: endDate1,
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

	const handleAmountFilterStartChange = event => {
		const value = event.target.value;
		const regex = /^\d*(\.\d{0,2})?$/;

		if (parseFloat(value) < 0) alert('Amount cannot be a negative number');

		if (regex.test(value)) {
			setStyleErrorStart('green');
			setValidAmountStart(true);
			setAmountFilterStart(value);
			textFieldAmountStart = 'textFieldAmountStart';
		} else {
			setStyleErrorStart('red');
			setValidAmountStart(false);
			textFieldAmountStart = 'invalid';
			alert('Amount must be a positive number');
		}
	};

	const handleAmountFilterEndChange = event => {
		const value = event.target.value;
		const regex = /^\d*(\.\d{0,2})?$/;

		if (parseFloat(value) < 0) alert('Amount cannot be a negative number');

		if (parseFloat(amountFilterStart) > parseFloat(value)) alert('Start amount can not be higher than end value');

		if (regex.test(value)) {
			setStyleErrorEnd('green');
			setValidAmountEnd(true);
			setAmountFilterEnd(value);
			textFieldAmountEnd = 'textFieldAmountStart';
		} else {
			setStyleErrorEnd('red');
			setValidAmountEnd(false);
			textFieldAmountEnd = 'invalid';
			alert('Amount must be a positive number');
		}
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

	const clearAmountStartFilter = () => {
		setAmountFilterStart('');
	};

	const clearAmountEndFilter = () => {
		setAmountFilterEnd('');
	};
	const styles = theme => ({
		textField: {
			width: '90%',
			marginLeft: 'auto',
			marginRight: 'auto',
			color: 'white',
			paddingBottom: 0,
			marginTop: 0,
			fontWeight: 500,
		},
	});

	return (
		<table className={cn.table}>
			<thead>
				<tr>
					<th>
						<p className={cn.textInTh}>ID</p>
					</th>
					<th>
						{sortingColumn != 'DateTime' ? (
							<div className={cn.unSort}>
								<p>Date</p>
								<SwapVertSharpIcon
									sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
									onClick={() => {
										setSortingColumn('DateTime');
										setSortingDirection('asc');
									}}
								/>
							</div>
						) : (
							<TableSortLabel
								direction={sortDirectionDate}
								onClick={handleSortDirectionDateChange}
								sx={{
									'& .MuiTableSortLabel-icon': {
										color: 'white !important',
									},
								}}
								hideSortIcon={false}
								active={true}
							>
								<p className={cn.textInTh}>Date</p>
							</TableSortLabel>
						)}
					</th>
					<th>
						{sortingColumn != 'Recipient' ? (
							<div className={cn.unSort}>
								<p>Recipient</p>
								<SwapVertSharpIcon
									sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
									onClick={() => {
										setSortingColumn('Recipient');
										setSortingDirection('asc');
										setSortDirectionAmount('asc');
									}}
								/>
							</div>
						) : (
							<TableSortLabel
								direction={sortDirectionRecipient}
								onClick={handleSortDirectionRecipientChange}
								sx={{
									'& .MuiTableSortLabel-icon': {
										color: 'white !important',
									},
								}}
								hideSortIcon={false}
								active={true}
							>
								<p className={cn.textInTh}>Recipient</p>
							</TableSortLabel>
						)}
					</th>
					<th>
						{sortingColumn != 'Amount' ? (
							<div className={cn.unSort}>
								<p>Amount </p>
								<SwapVertSharpIcon
									sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
									onClick={() => {
										setSortingDirection('asc');
										setSortDirectionAmount('asc');
										setSortingColumn('Amount');
									}}
								/>
							</div>
						) : (
							<TableSortLabel
								direction={sortDirectionAmount}
								onClick={handleSortDirectionAmountChange}
								sx={{
									'& .MuiTableSortLabel-icon': {
										color: 'white !important',
									},
								}}
								hideSortIcon={false}
								active={true}
							>
								<p className={cn.textInTh}>Amount</p>
							</TableSortLabel>
						)}
					</th>
					<th>
						{sortingColumn != 'Status' ? (
							<div className={cn.unSort}>
								<p>Status </p>
								<SwapVertSharpIcon
									sx={{ verticalAlign: 'center', marginBottom: 'auto', marginTop: 'auto' }}
									onClick={() => {
										setSortingColumn('Status');
										setSortingDirection('asc');
									}}
								/>
							</div>
						) : (
							<TableSortLabel
								direction={sortDirectionStatus}
								onClick={handleSortDirectionStatusChange}
								sx={{
									'& .MuiTableSortLabel-icon': {
										color: 'white !important',
									},
								}}
								hideSortIcon={false}
								active={true}
							>
								<p className={cn.textInTh}>Status</p>
							</TableSortLabel>
						)}
					</th>
					<th></th>
				</tr>

				<tr>
					<th></th>
					<th>
						<div className={cn.dateInputWrapper}>
							<div className={cn.dateInput}>
								<a>Start:</a>
								<a>End:</a>
							</div>
							<div className={cn.dateInput}>
								<input
									type='date'
									className={startDateClass}
									format='dd-MM-y'
									value={dateStartFilter}
									onChange={handleDateStartFilterChange}
								/>
								<input
									type='date'
									className={endDateClass}
									format='dd-MM-y'
									value={dateEndFilter}
									onChange={handleDateEndFilterChange}
								/>
							</div>
							<div className={cn.dateInput}>
								<input
									type='time'
									className={startTimeClass}
									value={timeStartFilter}
									onChange={handleTimeStartFilterChange}
								/>

								<input
									type='time'
									className={endTimeClass}
									value={timeEndFilter}
									onChange={handleTimeEndFilterChange}
								/>
							</div>
						</div>
					</th>

					<th>
						<TextField
							className={cn.textFieldSearch}
							value={recipientFilter}
							size='small'
							onChange={handleRecipientFilterChange}
							InputProps={{
								endAdornment: (
									<IconButton onClick={clearRecipientFilter}>
										<ClearIcon />
									</IconButton>
								),
							}}
						></TextField>
					</th>
					<th>
						<div className={cn.amountWrapper}>
							<p>Min:</p>
							<input type='number' onChange={event => setAmountFilterStart(event.target.value)}></input>
							<p>Max:</p>
							<input type='number' onChange={event => setAmountFilterEnd(event.target.value)}></input>
						</div>
					</th>
					<th>
						<FormControl fullWidth className={cn.statusChooser}>
							<Select
								labelId='filter-status-label'
								id='filter-status'
								value={statusFilter}
								displayEmpty
								label='Status'
								size='small'
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
					</th>
					<th>
						<button
							className={cn.filterBtn}
							onClick={() => {
								updateFilterOptions();
							}}
						>
							Click to filter
						</button>
						<button
							className={cn.filterBtn}
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
						</button>
					</th>
				</tr>
			</thead>
		</table>
	);
}
