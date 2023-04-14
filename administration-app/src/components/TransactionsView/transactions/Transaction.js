import { parseDate } from './../../../services/TransactionsView/transactionsService';
import { Card, TableRow, TableCell, Button } from '@mui/material';
export default function Transaction(arg) {
	return (
		<TableRow sx={{ bgcolor: '#fff' }}>
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
					}}>
					Details
				</Button>
			</TableCell>
		</TableRow>
	);
}
