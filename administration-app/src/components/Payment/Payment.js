import cn from './Payment.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

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

	useEffect(() => {
		return () => {
			setTransactionAmount('');
			setRecipientName('');
			setRecipientAccountNumber('');
			setCurrency('USD');
			setType('Payment');
		};
	}, []);

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
						<p>Type:</p>
						<select className={cn.select} value={type} onChange={event => setCurrency(event.target.value)}>
							<option value='usd'>Credit</option>
							<option value='eur'>EUR</option>
							<option value='bam'>BAM</option>
							<option value='jpy'>JPY</option>
							<option value='gbp'>GBP</option>
							<option value='cad'>CAD</option>
							<option value='aud'>AUD</option>
							<option value='chf'>CHF</option>
							<option value='cny'>CNY</option>
							<option value='nzd'>NZD</option>
							<option value='mxn'>MXN</option>
							<option value='brl'>BRL</option>
						</select>
						<p>Currency:</p>
						<select className={cn.select} value={currency} onChange={event => setCurrency(event.target.value)}>
							<option value='usd'>USD</option>
							<option value='eur'>EUR</option>
							<option value='bam'>BAM</option>
							<option value='jpy'>JPY</option>
							<option value='gbp'>GBP</option>
							<option value='cad'>CAD</option>
							<option value='aud'>AUD</option>
							<option value='chf'>CHF</option>
							<option value='cny'>CNY</option>
							<option value='nzd'>NZD</option>
							<option value='mxn'>MXN</option>
							<option value='brl'>BRL</option>
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

					<button className={cn.button} type='submit'>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
