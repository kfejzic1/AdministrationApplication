import './Transaction.css';
export default function Transaction(arg) {
	console.log('indec=', arg.index);
	return arg.index % 2 !== 0 ? (
		<div className='transaction-margin'>
			<div className='transaction-container'>
				<div className='transaction-column'>
					<p>{arg.prop.date}</p>
				</div>
				<div className='vertical-line'></div>
				<div className='transaction-column'>
					<p>{arg.prop.recipient}</p>
				</div>
				<div className='vertical-line'></div>
				<div className='transaction-column'>
					<p>{arg.prop.amount}</p>
				</div>
				<div className='vertical-line'></div>
				<div className='transaction-column'>
					<p>{arg.prop.status}</p>
				</div>
				<div className='vertical-line'></div>
				<div className='vertical-align-div'>
					<div
						className='detailsBtn'
						onClick={() => {
							arg.setDetails(arg.prop);
						}}
					>
						<p>Details</p>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className='transaction-margin'>
			<div className='transaction-container'>
				<div className='transaction-odd-column'>
					<p className='transaction-cell'>{arg.prop.date}</p>
				</div>
				<div className='vertical-line'></div>
				<div className='transaction-odd-column'>
					<p>{arg.prop.recipient}</p>
				</div>
				<div className='vertical-line'></div>
				<div className='transaction-odd-column'>
					<p>{arg.prop.amount}</p>
				</div>
				<div className='vertical-line'></div>
				<div className='transaction-odd-column'>
					<p>{arg.prop.status}</p>
				</div>
				<div className='vertical-line'></div>
				<div className='vertical-align-div'>
					<div
						className='detailsBtn'
						onClick={() => {
							arg.setDetails(arg.prop);
						}}
					>
						<p>Details</p>
					</div>
				</div>
			</div>
		</div>
	);
}
