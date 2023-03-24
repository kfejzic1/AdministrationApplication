import './Transaction.css';
export default function TransactionsListHeader() {
	return (
		<div className='transactions-header-container'>
			<div className='column'>Date</div>
			<div className='vertical-line'></div>
			<div className='column'>Recipient</div>
			<div className='vertical-line'></div>
			<div className='column'>Amount</div>
			<div className='vertical-line'></div>
			<div className='column'>Status</div>
			<div className='fakeBtn'></div>
		</div>
	);
}
