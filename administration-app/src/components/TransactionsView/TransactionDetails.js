import './Transaction.css'


export default function TransactionDetails(arg) {

return (
<div className="transaction-margin">
            <div className='transaction-container'>
                <div className='transaction-column'>{arg.props.date}</div>
                <div className='transaction-column'>{arg.props.recipient}</div>
                <div className='transaction-column'>{arg.props.amount}</div>
                <div className='transaction-column'>{arg.props.status}</div>
                <button onClick={()=>{arg.setDetails(null)}} >zatvori</button>
		    </div>
        </div>
)
}