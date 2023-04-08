import { getTransactionDetails } from '../../../services/TransactionsView/transactionsService';
import { useEffect, useState } from 'react';
import { parseDate } from './../../../services/TransactionsView/transactionsService';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TableCell, TableRow, TableHead, Table, Input, Typography, TableBody } from '@mui/material';
export default function TransactionDetails(arg) {
	const [props, setProps] = useState({
		type: 'loading',
		dateTime: 'laoding',
		recipient: 'loading',
		account: 'loading',
		amount: 0,
	});
	const navigate = useNavigate();
	useEffect(() => {
		getTransactionDetails(arg.props.id, arg.mock).then(transaction => {
			setProps(transaction.data);
			arg.setIsLoading(false);
		});
	}, []);
	return (
		<Box sx={{ bgcolor: '#eceff1', width: '100%', height: '100%' }}>
			<Typography variant='h2' sx={{ bgcolor: '#fff', width: '100%', pb: 3, mb: 3 }} align='center'>
				Transaction details
			</Typography>
			<Table sx={{ width: '95%', m: 'auto', bgcolor: '#fff' }}>
				<TableHead>
					<TableRow>
						<TableCell align='center'>ID</TableCell>
						<TableCell align='center'>Date</TableCell>
						<TableCell align='center'>Recipient</TableCell>
						<TableCell align='center'>Amount</TableCell>
						<TableCell align='center'>Status</TableCell>
						<TableCell align='center'>Bank Account</TableCell>
						<TableCell align='center'>Name of the Payee</TableCell>
						<TableCell align='center'></TableCell>
					</TableRow>
				</TableHead>
				<TableRow>
					<TableCell align='center'>{arg.props.id}</TableCell>
					<TableCell align='center'>{parseDate(props.dateTime)}</TableCell>
					<TableCell align='center'>{props.recipient}</TableCell>
					<TableCell align='center'>{props.amount}</TableCell>
					<TableCell align='center'>{props.status}</TableCell>
					<TableCell align='center'>{props.account}</TableCell>
					<TableCell align='center'>{props.type}</TableCell>
					<TableCell sx={{ justifyContent: 'space-around', display: 'flex', flexDirection: 'row' }}>
						<Button
							onClick={() => {
								arg.setDetails(null);
							}}
						>
							Close
						</Button>
						<Button
							onClick={() => {
								navigate('/payment/USD/Payment/' + props.recipient + '/' + props.amount + '/' + props.account);
							}}
						>
							Reuse
						</Button>
					</TableCell>
				</TableRow>
			</Table>
		</Box>
	);
}
