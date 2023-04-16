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
		getTransactionDetails(arg.props.id, arg.mock)
			.then(transaction => {
				setProps(transaction.data);
				arg.setIsLoading(false);
			})
			.catch(err => {
				if (err == 401 && !arg.alertShowing) {
					arg.setAlertShowing(true);
				}
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
						<TableCell align='center'>Currency</TableCell>
						<TableCell align='center'>Sender</TableCell>
						<TableCell align='center'>Type</TableCell>
						<TableCell align='center'>Purpose</TableCell>
						<TableCell align='center'></TableCell>
					</TableRow>
				</TableHead>
				<TableRow>
					<TableCell align='center'>{arg.props.id}</TableCell>
					<TableCell align='center'>{parseDate(arg.props.createdAt)}</TableCell>
					<TableCell align='center'>
						{arg.props.recipient.name ? arg.props.recipient.name : arg.props.recipient.phone_number}
					</TableCell>
					<TableCell align='center'>{arg.props.amount}</TableCell>
					<TableCell align='center'>{arg.props.currency}</TableCell>
					<TableCell align='center'>
						{arg.props.sender.name ? arg.props.sender.name : arg.props.sender.phone_number}
					</TableCell>
					<TableCell align='center'>{arg.props.transactionType}</TableCell>
					<TableCell align='center'>{arg.props.transactionPurpose}</TableCell>
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
								arg.props.recipient.name
									? navigate(
											'/payment/' +
												arg.props.currency +
												'/Payment/' +
												arg.props.recipient.name +
												'/' +
												arg.props.transactionPurpose +
												'/' +
												arg.props.amount +
												'/' +
												arg.props.recipient.account_number,
											{ state: { isPopUp: true, isRecipient: true } }
									  )
									: navigate(
											'/payment/' +
												arg.props.currency +
												'/Payment/' +
												arg.props.transaction_purpose +
												'/' +
												arg.props.amount +
												'/' +
												arg.props.recipient.phone_number,
											{ state: { isPopUp: true, isPhoneNumber: true } }
									  );
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
