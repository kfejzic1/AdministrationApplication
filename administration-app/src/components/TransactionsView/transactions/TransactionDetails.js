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
		<div className={cn.transactoin_root}>
			<table className={cn.tableDetails}>
				<thead>
					<tr>
						<th className={cn.th}>ID</th>
						<th className={cn.th}>Date</th>
						<th className={cn.th}>Recipient</th>
						<th className={cn.th}>Amount</th>
						<th className={cn.th}>Status</th>
						<th className={cn.th}>Bank Account</th>
						<th className={cn.th}>Name of the Payee</th>
						<th className={cn.th}></th>
					</tr>
				</thead>
				<tbody>
					<tr className={cn.tbodyDetails}>
						<td className={cn.td}>{arg.props.id}</td>
						<td className={cn.td}>{parseDate(props.dateTime)}</td>
						<td className={cn.td}>{props.recipient}</td>
						<td className={cn.td}>{props.amount}</td>
						<td className={cn.td}>{props.status}</td>
						<td className={cn.td}>{props.account}</td>
						<td className={cn.td}>{props.type}</td>
						<td className={cn.td}>
							<div className={cn.closeBtnDiv}>
								<button
									className={cn.closeBtn}
									onClick={() => {
										arg.setDetails(null);
									}}
								>
									<p className={cn.pNoMargin}>Close</p>
								</button>
								<button
									className={cn.closeBtn}
									onClick={() => {
										arg.setPaymentInfo(props);
										navigate('/payment');
									}}
								>
									<p className={cn.pNoMargin}>Reuse</p>
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
