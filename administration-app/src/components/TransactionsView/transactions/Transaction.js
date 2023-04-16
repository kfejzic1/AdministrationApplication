import { parseDate } from './../../../services/TransactionsView/transactionsService';
import { Card, TableRow, TableCell, Button } from '@mui/material';
export default function Transaction(arg) {
	if (arg.variant && arg.variant == 'group')
		return (
			<TableRow sx={{ bgcolor: '#fff' }}>
				<TableCell sx={{ width: '11%' }}></TableCell>
				<TableCell sx={{ width: '20%' }} align='center'>
					{parseDate(arg.prop.createdAt)}
				</TableCell>
				<TableCell sx={{ width: '20%' }} align='center'>
					{arg.prop.recipient.name ? arg.prop.recipient.name : arg.prop.recipient.phoneNumber}
				</TableCell>
				<TableCell sx={{ width: '20%' }} align='center'>
					{arg.prop.amount}
				</TableCell>
				<TableCell sx={{ width: '10%' }} align='center'>
					{arg.prop.currency}
				</TableCell>
				<TableCell sx={{ width: '13%' }} align='center'>
					{arg.prop.transactionType}
				</TableCell>
				<TableCell sx={{ width: '7%' }} align='center'>
					<Button
						onClick={() => {
							arg.setDetails(arg.prop);
						}}>
						Details
					</Button>
				</TableCell>
			</TableRow>
		);
	else
		return (
			<TableRow sx={{ bgcolor: '#fff' }}>
				<TableCell></TableCell>
				<TableCell align='center'>{parseDate(arg.prop.createdAt)}</TableCell>
				<TableCell align='center'>
					{arg.prop.recipient.name ? arg.prop.recipient.name : arg.prop.recipient.phoneNumber}
				</TableCell>
				<TableCell align='center'>{arg.prop.amount}</TableCell>
				<TableCell align='center'>{arg.prop.currency}</TableCell>
				<TableCell align='center'>{arg.prop.transactionType}</TableCell>
				<TableCell align='center'>
					<Button
						onClick={() => {
							arg.setDetails(arg.prop);
						}}>
						Details
					</Button>
				</TableCell>
			</TableRow>
		);
}
