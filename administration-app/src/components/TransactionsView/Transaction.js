import './Transaction.css';
export default function Transaction(arg) {
	console.log('indec=', arg.index);
	return arg.index % 2 !== 0 ? (
		<div className="transaction-margin">
            <div className='transaction-container'>
                <div className='transaction-column'>{arg.prop.date}</div>
                <div className='transaction-column'>{arg.prop.recipient}</div>
                <div className='transaction-column'>{arg.prop.amount}</div>
                <div className='transaction-column'>{arg.prop.status}</div>
                <button className="detailsBtn" onClick={()=>{arg.setDetails(arg.prop)}}>Details</button>
		    </div>
        </div>
	) : (
		<div className="transaction-margin">
            <div className='transaction-container'>
                <div className='transaction-odd-column'>{arg.prop.date}</div>
                <div className='transaction-odd-column'>{arg.prop.recipient}</div>
                <div className='transaction-odd-column'>{arg.prop.amount}</div>
                <div className='transaction-odd-column'>{arg.prop.status}</div>
                <button className="detailsBtn" onClick={()=>{arg.setDetails(arg.prop)}}>Details</button>
            </div>
        </div>
	);
}
