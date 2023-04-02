import cn from './Payment.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { sendPaymentInfo } from '../../services/Payment/PaymentServices';

export const Payment = props => {
	const [transactionAmount, setTransactionAmount] = useState(props.paymentInfo ? props.paymentInfo.amount : '');
	const [recipientName, setRecipientName] = useState(props.paymentInfo ? props.paymentInfo.recipient : '');
	const [recipientAccountNumber, setRecipientAccountNumber] = useState(
		props.paymentInfo ? props.paymentInfo.account : ''
	);
	const [currency, setCurrency] = useState('USD');
	const [type, setType] = useState('Payment');
	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		// POST za plaćanje
	}

	const goBackHandler = () => {
		navigate(-1);
	};

	return (
		<div className={cn.payment_root}>
			<button onClick={goBackHandler} className={cn.backBtn}>
				<span>{'<'}</span>
			</button>
			<div className={cn.payment_form}>
				<h3 className={cn.h3}>New Transaction</h3>

				<form className={cn.form2} onSubmit={handleSubmit}>
					<br />
					<br />
					<input
						className={cn.input}
						type='number'
						placeholder='Transaction amount'
						value={transactionAmount}
						onChange={event => setTransactionAmount(event.target.value)}
					/>
					<br />
					<div className={cn.selectWrap}>
						<div className={cn.pWrapper}>
							<div>Type:</div>
						</div>
						<select className={cn.select} value={type} onChange={event => setType(event.target.value)}>
							<option value='Credit'>Credit</option>
							<option value='Payment'>Payment</option>
							<option value='Recip'>Recip</option>
							<option value='Gift'>Gift</option>
						</select>
						<div className={cn.pWrapper}>
							<div>Currency:</div>
						</div>
						<select className={cn.select} value={currency} onChange={event => setCurrency(event.target.value)}>
							<option value='USD'>USD</option>
							<option value='EUR'>EUR</option>
							<option value='BAM'>BAM</option>
							<option value='JPY'>JPY</option>
							<option value='GBP'>GBP</option>
							<option value='CAD'>CAD</option>
							<option value='AUD'>AUD</option>
							<option value='CHF'>CHF</option>
							<option value='CNY'>CNY</option>
							<option value='NZD'>NZD</option>
							<option value='MXN'>MXN</option>
							<option value='BRL'>BRL</option>
						</select>
					</div>
					<br />

					<input
						className={cn.input}
						type='text'
						placeholder='Recipient name'
						value={recipientName}
						onChange={event => setRecipientName(event.target.value)}
					/>

					<br />

					<input
						className={cn.input}
						type='text'
						placeholder='Recipient account number'
						value={recipientAccountNumber}
						onChange={event => setRecipientAccountNumber(event.target.value)}
					/>

					<br />

					<button
						className={cn.button}
						type='submit'
						onClick={() => {
							sendPaymentInfo({
								amount: parseFloat(transactionAmount),
								currency: currency,
								paymentType: type,
								recipientAccountNumber: recipientAccountNumber,
								recipientName: 'Test Recipient', //recipientAccountNumber,
							})
								.then(() => {
									alert('Payment successfuly sent!');
								})
								.catch(() => {
									alert('Failed!');
								});
							console.log('moj=', currency, recipientName, recipientAccountNumber, type, transactionAmount);
						}}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
