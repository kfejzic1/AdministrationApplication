import cn from '../css/TransactionsHeader.module.css';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { OutlinedInput } from '@mui/material';

/*import Table from '@mui/material';
import TableRow from '@mui/material';
import TableBody from '@mui/material';
import TableCell from '@mui/material';*/

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

	const handleSortDirectionIdChange = () => {
		const newSortDirection = sortDirectionId === 'asc' ? 'desc' : 'asc';
		setSortDirectionId(newSortDirection);

		// send axios request to sort data ?
	};

	const handleSortDirectionDateChange = () => {
		const newSortDirection = sortDirectionDate === 'asc' ? 'desc' : 'asc';
		setSortDirectionDate(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('DateTime');
		// send axios request to sort data ?
	};

	const handleSortDirectionRecipientChange = () => {
		const newSortDirection = sortDirectionRecipient === 'asc' ? 'desc' : 'asc';
		setSortDirectionRecipient(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('Recipient');
		// send axios request to sort data ?
	};

	const handleSortDirectionAmountChange = () => {
		const newSortDirection = sortDirectionAmount === 'asc' ? 'desc' : 'asc';
		setSortDirectionAmount(newSortDirection);
		setSortingDirection(newSortDirection);
		setSortingColumn('Amount');
		// send axios request to sort data ?
	};

	const handleSortDirectionStatusChange = () => {
		const newSortDirection = sortDirectionStatus === 'asc' ? 'desc' : 'asc';
		setSortDirectionStatus(newSortDirection);
		// send axios request to sort data ?
	};

	const handleIdFilterChange = event => {
		setIdFilter(event.target.value);
	};

	const handleDateStartFilterChange = event => {
		const startDate = new Date(event.target.value);
		const endDate = new Date(dateEndFilter);

		if (startDate > endDate && event.target.value != '') {
			alert('Starting date cannot be highter then ending date');
			setStartDateClass('invalidDateStart');
			// console.log(startTimeClass)
		} else {
			setDateStartFilter(event.target.value);
			setStartDateClass('datePickerStart');
			// console.log(startTimeClass)
		}
	};

	const handleDateEndFilterChange = event => {
		const startDate = new Date(dateStartFilter);
		const endDate = new Date(event.target.value);

		if (startDate > endDate && event.target.value != '') {
			alert('Starting date cannot be highter then ending date');
			setEndDateClass('invalidDateEnd');
			// console.log(endTimeClass)
		} else {
			setDateEndFilter(event.target.value);
			setEndDateClass('datePickerEnd');
			// console.log(endTimeClass)
		}
	};

	const handleTimeStartFilterChange = event => {
		const startTime = event.target.value;
		const endTime = timeEndFilter;

		if (startTime > endTime && endTime != '' && startTime != '') {
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

		if (startTime > endTime && endTime != '' && startTime != '') {
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

		if (parseFloat(amountFilterEnd) < parseFloat(amountFilterStart))
			alert('Ending value cannot be lower then starting value');

		if (parseFloat(value) < 0) alert('Amount cannot be a negative number');

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

	/*const clearStatusFilter = () => {
        setStatusFilterEnd('');
    };*/

	const handleFilterClick = () => {
		// Call Axios request to filter data
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
						<TableSortLabel
							direction={sortDirectionId}
							onClick={handleSortDirectionIdChange}
							sx={{
								'& .MuiTableSortLabel-icon': {
									color: 'white !important',
								},
							}}
							hideSortIcon={false}
							active={true}
						>
							ID
						</TableSortLabel>
					</th>
					<th>
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
							Date
						</TableSortLabel>
					</th>
					<th>
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
							Recipient
						</TableSortLabel>
					</th>
					<th>
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
							Amount
						</TableSortLabel>
					</th>
					<th>
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
							Status
						</TableSortLabel>
					</th>
					<th></th>
				</tr>
				<tr>
					<th>
						<TextField
							className={cn.textFieldSearch}
							value={idFilter}
							onChange={handleIdFilterChange}
							InputProps={{
								endAdornment: (
									<IconButton onClick={clearIdFilter}>
										<ClearIcon />
									</IconButton>
								),
							}}
						></TextField>
					</th>
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
						<FormControl fullWidth className={cn.amountChooser}>
							<InputLabel
								variant='standard'
								htmlFor='amount-filter'
								sx={{
									marginLeft: '2px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%',
								}}
							>
								Click to enter amount
							</InputLabel>
							<Select
								className={cn.select}
								/*inputProps={{
                                name: 'Amount',
                                id: 'amount-filter',
                                value: {amountFilterStart, amountFilterEnd}
                                }}*/
							>
								<InputLabel sx={{ marginLeft: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
									Enter start value
								</InputLabel>
								<TextField
									className={textFieldAmountStart}
									placeholder='Start'
									value={amountFilterStart}
									onChange={handleAmountFilterStartChange}
									sx={{
										marginLeft: '2px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										'& .MuiOutlinedInput-notchedOutline': {
											borderColor: styleErrorStart,
										},
									}}
									InputProps={
										{
											//endAdornment: (<IconButton onClick={clearAmountStartFilter}><ClearIcon /></IconButton>)
										}
									}
								></TextField>

								<InputLabel sx={{ marginLeft: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
									Enter end value
								</InputLabel>

								<TextField
									className={textFieldAmountEnd}
									placeholder='End'
									value={amountFilterEnd}
									onChange={handleAmountFilterEndChange}
									sx={{
										marginLeft: '2px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										'& .MuiOutlinedInput-notchedOutline': {
											borderColor: styleErrorEnd,
										},
									}}
									InputProps={
										{
											//endAdornment: (<IconButton onClick={clearAmountEndFilter}><ClearIcon /></IconButton>)
										}
									}
								></TextField>
							</Select>
						</FormControl>
					</th>
					<th>
						<FormControl fullWidth className={cn.statusChooser}>
							<Select
								labelId='filter-status-label'
								id='filter-status'
								value={statusFilter}
								displayEmpty
								label='Status'
								onChange={handleStatusFilterChange}
							>
								<MenuItem value='Proccesing'>Proccesing</MenuItem>
								<MenuItem value='Pending'>Pending</MenuItem>
								<MenuItem value='Succes'>Succes</MenuItem>
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
								arg.setFilterOptions({
									Recipient: recipientFilter,
									Status: statusFilter,
									StartDate: dateStartFilter + 'T' + timeStartFilter,
									EndDate: dateEndFilter + 'T' + timeEndFilter,
									MinAmount: amountFilterStart,
									MaxAmount: amountFilterEnd,
									SortingOptoin: sortingColumn,
									Ascending: sortingDirection == 'asc' ? true : false,
								});
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
									StartDate: 'T',
									EndDate: 'T',
									MinAmount: '',
									MaxAmount: '',
									SortingOptoin: 'DateTime',
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
