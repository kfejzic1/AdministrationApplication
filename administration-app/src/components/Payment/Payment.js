import cn from './Payment.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { sendPaymentInfo } from '../../services/Payment/PaymentServices';

export const Payment = props => {
	const { currency, recipientAccountNumber, recipientName, transactionAmount, type } = useParams();
	console.log('mozda je=', currency, recipientAccountNumber, recipientName);
	const [transactionAmountState, setTransactionAmount] = useState(
		transactionAmount != undefined && transactionAmount != -1 ? transactionAmount : '0'
	);
	const [recipientNameState, setRecipientName] = useState(
		recipientName != undefined && recipientName != -1 ? recipientName : ''
	);
	const [recipientAccountNumberState, setRecipientAccountNumber] = useState(
		recipientAccountNumber != undefined && recipientAccountNumber != -1 ? recipientAccountNumber : ''
	);
	const [currencyState, setCurrency] = useState(currency != undefined && currency != -1 ? currency : 'USD');
	const [typeState, setType] = useState(type != undefined && type != -1 ? type : 'Payment');
	const navigate = useNavigate();
	console.log('currency', currencyState);
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
						value={transactionAmountState}
						onChange={event => setTransactionAmount(event.target.value)}
					/>
					<br />
					<div className={cn.selectWrap}>
						<div className={cn.pWrapper}>
							<div className={cn.pWrapperDiv}>Type:</div>
						</div>
						<select className={cn.select} value={typeState} onChange={event => setType(event.target.value)}>
							<option value='Credit'>Credit</option>
							<option value='Payment'>Payment</option>
							<option value='Recip'>Recip</option>
							<option value='Gift'>Gift</option>
						</select>
						<div className={cn.pWrapper}>
							<div className={cn.pWrapperDiv}>Currency:</div>
						</div>
						<select className={cn.select} value={currencyState} onChange={event => setCurrency(event.target.value)}>
							<option value='EUR'>EUR</option>
							<option value='USD'>USD</option>
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
						value={recipientNameState}
						onChange={event => setRecipientName(event.target.value)}
					/>

					<br />

					<input
						className={cn.input}
						type='text'
						placeholder='Recipient account number'
						value={recipientAccountNumberState}
						onChange={event => setRecipientAccountNumber(event.target.value)}
					/>

					<br />

					<button
						className={cn.button}
						type='submit'
						onClick={() => {
							sendPaymentInfo({
								amount: parseFloat(transactionAmountState),
								currency: currencyState,
								paymentType: typeState,
								recipientAccountNumber: recipientAccountNumberState,
								recipientName: 'Test Recipient', //recipientAccountNumberState,
							})
								.then(() => {
									alert('Payment successfuly sent!');
								})
								.catch(() => {
									alert('Failed!');
								});
							console.log(
								'moj=',
								currencyState,
								recipientNameState,
								recipientAccountNumberState,
								typeState,
								transactionAmountState
							);
						}}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
