import '../css/Transactions.css';
import TransactionsListHeader from './TransactionsListHeader';

export default function TransactionDetails(arg) {
	return (
		/*<div>
			<div>
				<TransactionsDetailsHeader /> 
			</div>
			<div className='transaction-margin'>
				<div className='transaction-container'>
					<div className='transaction-column'>
						<p>{arg.props.id}</p>
					</div>
					<div className='transaction-column'>
						<p>{arg.props.date}</p>
					</div>
					<div className='transaction-column'>
						<p>{arg.props.recipient}</p>
					</div>
					<div className='transaction-column'>
						<p>{arg.props.amount}</p>
					</div>
					<div className='transaction-column'>
						<p>{arg.props.status}</p>
					</div>
					<div className='transaction-column'>
						<p>{arg.props.currency}</p>
					</div>
					<div className='transaction-column'>
						<p>{arg.props.nameOfThePayee}</p>
					</div>
					<div className='transaction-column'>
						<p>{arg.props.bankAccount}</p>
					</div>
					<div className='transaction-column'>
						<p>{arg.props.nameOfTheBank}</p>
					</div>
					<div className='transaction-column'>
						<p>{arg.props.methodOfPayment}</p>
					</div>
					
					<div className='vertical-align-div'>
						<div
							className='detailsBtn'
							onClick={() => {
								arg.setDetails(null);
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
					<td>{arg.props.id}</td>
					<td>{arg.props.date}</td>
					<td>{arg.props.recipient}</td>
					<td>{arg.props.amount}</td>
					<td>{arg.props.status}</td>
					<td>{arg.props.currency}</td>
					<td>{arg.props.nameOfThePayee}</td>
					<td>{arg.props.bankAccount}</td>
					<td>{arg.props.nameOfTheBank}</td>
					<td>{arg.props.methodOfPayment}</td>
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
