import { parseDate } from './../../../services/TransactionsView/transactionsService';
import { Card, TableRow, TableCell, Button } from '@mui/material';
export default function Transaction(arg) {
	if (arg.variant && arg.variant == 'group')
		return (
			<TableRow sx={{ bgcolor: '#fff' }}>
				<TableCell sx={{ width: '11%' }}></TableCell>
				<TableCell sx={{ width: '20%' }} align='center'>
					{parseDate(arg.prop.date)}
				</TableCell>
				<TableCell sx={{ width: '20%' }} align='center'>
					{arg.prop.recipient.name ? arg.prop.recipient.name : arg.prop.recipient.phone_number}
				</TableCell>
				<TableCell sx={{ width: '20%' }} align='center'>
					{arg.prop.amount}
				</TableCell>
				<TableCell sx={{ width: '10%' }} align='center'>
					{arg.prop.currency}
				</TableCell>
				<TableCell sx={{ width: '13%' }} align='center'>
					{arg.prop.transaction_type}
				</TableCell>
				<TableCell sx={{ width: '7%' }} align='center'>
					<Button
						onClick={() => {
							arg.setDetails(arg.prop);
						}}
					>
						Details
					</Button>
				</TableCell>
			</TableRow>
		);
	else
		return (
			<TableRow sx={{ bgcolor: '#fff' }}>
				<TableCell></TableCell>
				<TableCell align='center'>{parseDate(arg.prop.date)}</TableCell>
				<TableCell align='center'>
					{arg.prop.recipient.name ? arg.prop.recipient.name : arg.prop.recipient.phone_number}
				</TableCell>
				<TableCell align='center'>{arg.prop.amount}</TableCell>
				<TableCell align='center'>{arg.prop.currency}</TableCell>
				<TableCell align='center'>{arg.prop.transaction_type}</TableCell>
				<TableCell align='center'>
					<Button
						onClick={() => {
							arg.setDetails(arg.prop);
						}}
					>
						Details
					</Button>
				</TableCell>
			</TableRow>
		);
}
