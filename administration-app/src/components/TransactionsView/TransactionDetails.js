import './Transaction.css';

export default function TransactionDetails(arg) {
	return (
		<div className='transaction-margin'>
			<div className='transaction-container'>
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
	);
}
