import { parseDate } from './../../../services/TransactionsView/transactionsService';
import { Card, TableRow, TableCell, Button } from '@mui/material';
export default function Transaction(arg) {
	return (
		<TableRow sx={{ bgcolor: '#fff' }}>
			<TableCell align='center'>{parseDate(arg.prop.dateTime)}</TableCell>
			<TableCell align='center'>{arg.prop.recipient}</TableCell>
			<TableCell align='center'>{arg.prop.amount}</TableCell>
			<TableCell align='center'>{arg.prop.id}</TableCell>
			<TableCell align='center'>{arg.prop.status}</TableCell>
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
