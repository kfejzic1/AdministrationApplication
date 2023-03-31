import { getTransactionDetails } from '../../../services/TransactionsView/transactionsService';
import cn from '../css/Transactions.module.css';
import { useEffect, useState } from 'react';
import { parseDate } from './../../../services/TransactionsView/transactionsService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
		<table className={cn.table}>
			<thead>
				<tr>
					<th>ID</th>
					<th>Date</th>
					<th>Recipient</th>
					<th>Amount</th>
					<th>Status</th>
					<th>Bank Account</th>
					<th>Name of the Payee</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{arg.props.id}</td>
					<td>{parseDate(props.dateTime)}</td>
					<td>{props.recipient}</td>
					<td>{props.amount}</td>
					<td>{props.status}</td>
					<td>{props.account}</td>
					<td>{props.type}</td>
					<td>
						<div className={cn.closeBtnDiv}>
							<button
								className={cn.closeBtn}
								onClick={() => {
									arg.setDetails(null);
								}}
							>
								<p>Close</p>
							</button>
							<button
								className={cn.closeBtn}
								onClick={() => {
									arg.setPaymentInfo(props);
									navigate('/payment');
								}}
							>
								<p>Reuse</p>
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
