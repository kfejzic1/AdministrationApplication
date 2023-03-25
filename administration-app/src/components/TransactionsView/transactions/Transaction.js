import '../css/Transactions.css';
export default function Transaction(arg) {
	// console.log('indec=', arg.index);
	return (
		/*<div className='transaction-margin'>
			<div className='transaction-container'>
				<div className='transaction-column'>
					<p>{arg.prop.id}</p>
				</div>
				<div className='vertical-line'></div>
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
						}}>
						<p>Details</p>
					</div>
				</div>
			</div>
		</div>*/
		<table>
			<tr>
				<td>{arg.prop.id}</td>
				<td>{arg.prop.date}</td>
				<td>{arg.prop.recipient}</td>
				<td>{arg.prop.amount}</td>
				<td>{arg.prop.status}</td>
				<td>
					<div className='detailsBtnDiv'>
						<button
							className='detailsBtn'
							onClick={() => {
								arg.setDetails(arg.prop);
							}}
						>
							<p>Details</p>
						</button>
					</div>
				</td>
			</tr>
		</table>
	);
}
