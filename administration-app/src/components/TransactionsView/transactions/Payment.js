import '../css/Payment.css';
import { useState } from 'react';

export const Payment = props => {
	const [transactionAmount, setTransactionAmount] = useState('');
	const [recipientName, setRecipientName] = useState('');
	const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
	const [currency, setCurrency] = useState('USD');

	function handleSubmit(event) {
		event.preventDefault();
		// code to handle form submission goes here
	}
	return (
		<div className='central'>
			<div className='payment-form'>
				<h3>New Transaction</h3>
				<form className='form2' onSubmit={handleSubmit}>
					<input
						type='number'
						placeholder='Transaction amount'
						value={transactionAmount}
						onChange={event => setTransactionAmount(event.target.value)}
					/>

					<select value={currency} onChange={event => setCurrency(event.target.value)}>
						<option value='USD'>USD</option>
						<option value='EUR'>EUR</option>
						<option value='GBP'>GBP</option>
					</select>

					<br />

					<input
						type='text'
						placeholder='Recipient name'
						value={recipientName}
						onChange={event => setRecipientName(event.target.value)}
					/>

					<br />

					<input
						type='text'
						placeholder='Recipient account number'
						value={recipientAccountNumber}
						onChange={event => setRecipientAccountNumber(event.target.value)}
					/>

					<br />

					<button type='submit'>Submit</button>
				</form>
			</div>
		</div>
	);
};
