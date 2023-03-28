import { getTransactionDetails } from '../../../services/TransactionsView/transactionsService';
import '../css/Transactions.css';
import { useEffect, useState } from 'react';
import { parseDate } from './../../../services/TransactionsView/transactionsService';

export default function TransactionDetails(arg) {
	const [props, setProps] = useState({
		type: 'loading',
		dateTime: 'laoding',
		recipient: 'loading',
		account: 'loading',
		amount: 0,
	});
	useEffect(() => {
		getTransactionDetails(arg.props.id).then(transaction => {
			setProps(transaction.data);
			arg.setIsLoading(false);
		});
	}, []);
	return (
		/*<div>
			<div>
				<TransactionsDetailsHeader /> 
			</div>
			<div className='transaction-margin'>
				<div className='transaction-container'>
					<div className='transaction-column'>
						<p>{props.id}</p>
					</div>
					<div className='transaction-column'>
						<p>{props.date}</p>
					</div>
					<div className='transaction-column'>
						<p>{props.recipient}</p>
					</div>
					<div className='transaction-column'>
						<p>{props.amount}</p>
					</div>
					<div className='transaction-column'>
						<p>{props.status}</p>
					</div>
					<div className='transaction-column'>
						<p>{props.currency}</p>
					</div>
					<div className='transaction-column'>
						<p>{props.nameOfThePayee}</p>
					</div>
					<div className='transaction-column'>
						<p>{props.bankAccount}</p>
					</div>
					<div className='transaction-column'>
						<p>{props.nameOfTheBank}</p>
					</div>
					<div className='transaction-column'>
						<p>{props.methodOfPayment}</p>
					</div>
					
					<div className='vertical-align-div'>
						<div
							className='detailsBtn'
							onClick={() => {
								setDetails(null);
							}}
						>
							<p>Close</p>
						</div>
					</div>
				</div>
			</div>
		</div>*/
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Date</th>
					<th>Recipient</th>
					<th>Amount</th>
					<th>Status</th>
					<th>Currency</th>
					<th>Name of the Payee</th>
					<th>Bank Account</th>
					<th>Name of the Bank</th>
					<th>Method of Payment</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td></td>
					<td>{parseDate(props.dateTime)}</td>
					<td>{props.recipient}</td>
					<td>{props.amount}</td>
					<td>{props.status}</td>
					<td></td>
					<td></td>
					<td>{props.account}</td>
					<td></td>
					<td>{props.type}</td>
					<td>
						<div className='closeBtnDiv'>
							<button
								class='closeBtn'
								onClick={() => {
									arg.setDetails(null);
								}}
							>
								<p>Close</p>
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
