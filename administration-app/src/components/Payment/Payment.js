import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import {
	getAccounts,
	getCurrencys,
	sendPaymentInfoAccount,
	sendPaymentInfoPhone,
} from '../../services/Payment/PaymentServices';
import { useLocation } from 'react-router-dom';
import { sendNotification } from '../../services/utilityService';
import { TextField, Button, FormGroup, Select, MenuItem, Menu, Typography, Box, InputLabel } from '@mui/material';
import LoadingSpinner from '../TransactionsView/LoadingSpinner/LoadingSpinner';
import Modal from '@mui/material/Modal';

export const Payment = props => {
	const {
		currency,
		recipientAccountNumber,
		recipientName,
		transactionType,
		transactionAmount,
		transactionPurpose,
		senderAccount,
		category,
	} = useParams();
	const [transactionAmountState, setTransactionAmount] = useState(
		transactionAmount != undefined && transactionAmount != -1 ? transactionAmount : '0'
	);
	const [senderAccountNumber, setSenderAccountNumber] = useState(
		senderAccount && senderAccount != -1 ? senderAccount : ''
	);
	const [recipientNameState, setRecipientName] = useState(
		recipientName != undefined && recipientName != -1 ? recipientName : ''
	);
	const [recipientAccountNumberState, setRecipientAccountNumber] = useState(
		recipientAccountNumber != undefined && recipientAccountNumber != -1 ? recipientAccountNumber : ''
	);
	const [currencyState, setCurrency] = useState(currency != undefined && currency != -1 ? currency : 'USD');
	const [transactionTypeState, setTransactionType] = useState(
		transactionType != undefined && transactionType != -1 ? transactionType : 'C2C'
	);
	const [categoryState, setCategory] = useState(category != undefined && category !== -1 ? category : '');
	const [interestingGroupState, setInterestingGroup] = useState('Person');
	const [transactionPurposeState, setTransactionPurpose] = useState(
		transactionPurpose != undefined && transactionPurpose != -1 ? transactionPurpose : 'Payment'
	);
	const [currencysList, setCurrencysList] = useState(null);
	const [accList, setAccList] = useState(null);
	useEffect(() => {
		getCurrencys()
			.then(items => {
				console.log(JSON.stringify(items));
				setCurrencysList(
					items.data.map(item => {
						{
							/* <MenuItem value=''>
							<em>moja</em>
						</MenuItem>;
					 
					*/
							return (
								<MenuItem key={item.name} value={item.name}>
									{item.name}
								</MenuItem>
							);
						}
					})
				);
				getAccounts()
					.then(accounts => {
						setAccList(
							accounts.data.map(item => {
								{
									return (
										<MenuItem key={item.accountNumber} value={item.accountNumber}>
											{item.accountNumber}
										</MenuItem>
									);
								}
							})
						);
						if (accounts.data.length > 0) setSenderAccountNumber(accounts.data[0].accountNumber);
						setOpen(false);
					})
					.catch(err => {
						console.error(err);
						setOpen(false);
						alert('Something went wrong, try refreshing1');
					});
			})
			.catch(err => {
				console.error(err);
				setOpen(false);
				alert('Something went wrong, try refreshing');
			});
	}, []);
	useEffect(() => {
		if (transactionTypeState != undefined && transactionTypeState === 'B2B') {
			setInterestingGroup('Company');
		} else if (
			transactionTypeState != undefined &&
			(transactionTypeState === 'B2C' || transactionTypeState === 'C2C')
		) {
			setInterestingGroup('Person');
		} else if (transactionTypeState != undefined && transactionTypeState === 'C2B') {
			setInterestingGroup('Company');
		}
	}, [transactionPurpose]);

	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		// POST za plaćanje
	}

	const goBackHandler = () => {
		navigate(-1);
	};

	const [open, setOpen] = useState(true);
	const [clickedButton, setClickedButton] = useState('');

	const handleButtonClick = button => {
		setClickedButton(button);
		setOpen(false);
	};

	return (
		<Box>
			<Modal open={open}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
					}}
				>
					<LoadingSpinner></LoadingSpinner>
				</Box>
			</Modal>
			<Box
				sx={{
					'--primary': '#e7ebf0',
					'--secondary': '#cfdeec',
					'--secondary2': '#c4d7e9',
					'--left': '#cbd6ba',
					'--right': '#e4e9d5',
					'--highlights': '#0f2027',
					'--babyblue': '#000000',
					'--bordercolor': 'rgba(255, 255, 255, 0.3)',
					'--text-size': '18px',
					'--text-size2': '25px',
					'--paddings': '40px 60px 60px 60px',
					'--inputPadding': '12px',
					'--formHeading': '60px',
					'--formGap': '20px',
					'--selectBtn': '12px',

					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
					marginTop: 8,
					backgroundImage: "url('http://localhost:3000/TransactionView/img/bg.png')",
					backgroundPosition: 'right',
					backgroundSize: '70% 70%',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<Button
					onClick={goBackHandler}
					variant='contained'
					sx={{
						color: '#fff',
						fontSize: 'var(--text-size2)',
						border: '1px solid #000000a8',
						alignSelf: 'center',
						borderRadius: '5px',
						padding: 'var(--inputPadding)',
						marginLeft: '5px',
					}}
				>
					<span>{'<'}</span>
				</Button>
				<Box
					sx={{
						display: 'flex',
						marginLeft: '10%',
						flexDirection: 'column',
						backgroundColor: '#ECEFF1',
						padding: 'var(--paddings)',
						borderRadius: '50px',
						boxShadow: '0 0.3rem 0.7rem 0 var(--highlights)',
						height: '95%',
					}}
				>
					<Typography
						variant='h3'
						sx={{
							fontSize: 'var(--formHeading)',
							fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
							fontWeight: 800,
							color: 'black',
							margin: 0,
						}}
					>
						New Transaction
					</Typography>

					<FormGroup
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							lineHeight: 'var(--formGap)',
						}}
						onSubmit={handleSubmit}
					>
						<br />
						<br />
						<TextField
							label='Transaction amount'
							type='number'
							placeholder='Transaction amount'
							value={transactionAmountState}
							onChange={event => setTransactionAmount(event.target.value)}
							sx={{
								padding: 'var(--inputPadding)',
								borderRadius: '5px',
								border: '0px',
								width: '70%',
								fontSize: 'var(--text-size)',
							}}
						/>
						<Box
							sx={{
								display: 'flex',
								width: '70%',
								justifyContent: 'center',
								gap: 2,
								flexDirection: 'row',
							}}
						>
							<Box
								sx={{
									justifyContent: 'center',
									alignItems: 'center',
									display: 'flex',
								}}
							>
								<Box
									sx={{
										color: 'var(--babyblue)',
									}}
								>
									Purpose:
								</Box>
							</Box>
							<Select
								sx={{
									color: '#fff',
									backgroundColor: '#1976D2',
									alignSelf: 'flex-end',
									borderRadius: '5px',
									padding: 0,
									lineHeight: 1,
								}}
								value={transactionPurposeState}
								onChange={event => setTransactionPurpose(event.target.value)}
							>
								<MenuItem value='Credit'>Credit</MenuItem>
								<MenuItem value='Payment'>Payment</MenuItem>
								<MenuItem value='Recip'>Recip</MenuItem>
								<MenuItem value='Gift'>Gift</MenuItem>
							</Select>
						</Box>

						<br />
						<Box
							sx={{
								flexDirection: 'row',
								justifyContent: 'space-around',
								width: '70%',
								display: 'flex',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							></Box>
							<br />

							<Box
								sx={{
									flexDirection: 'row',
									justifyContent: 'space-around',
									width: '70%',
									display: 'flex',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Box
										sx={{
											color: 'var(--babyblue)',
											display: 'inline-block',
										}}
									>
										Type:
									</Box>
								</Box>
								<Select
									sx={{
										color: '#fff',
										backgroundColor: '#1976D2',
										alignSelf: 'flex-end',
										borderRadius: '5px',
										padding: 0,
										lineHeight: 1,
									}}
									value={transactionTypeState}
									onChange={event => setTransactionType(event.target.value)}
								>
									<MenuItem value='B2B'>B2B</MenuItem>
									<MenuItem value='C2B'>C2B</MenuItem>
									<MenuItem value='C2C'>C2C</MenuItem>
								</Select>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Box
										sx={{
											color: 'var(--babyblue)',
											display: 'inline-block',
										}}
									>
										Currency:
									</Box>
								</Box>
							</Box>
							<Select
								sx={{
									color: '#fff',
									backgroundColor: '#1976D2',
									alignSelf: 'flex-end',
									borderRadius: '5px',
									padding: 0,
									lineHeight: 1,
								}}
								value={currencyState}
								onChange={event => setCurrency(event.target.value)}
							>
								{currencysList}
							</Select>
						</Box>
						<br />
						<Box
							sx={{
								display: 'flex',
								width: '70%',
								justifyContent: 'center',
								gap: 2,
								flexDirection: 'row',
							}}
						>
							<Box
								sx={{
									justifyContent: 'center',
									alignItems: 'center',
									display: 'flex',
								}}
							>
								<Box
									sx={{
										color: 'var(--babyblue)',
									}}
								>
									Sender account number:
								</Box>
							</Box>
							<Select
								sx={{
									color: '#fff',
									backgroundColor: '#1976D2',
									alignSelf: 'flex-end',
									borderRadius: '5px',
									padding: 0,
									lineHeight: 1,
								}}
								value={senderAccountNumber}
								onChange={event => setSenderAccountNumber(event.target.value)}
							>
								{accList}
							</Select>
						</Box>
						<br />

						<TextField
							label='Recipient name'
							sx={{
								padding: 'var(--inputPadding)',
								borderRadius: '5px',
								border: '0px',
								width: '70%',
								fontSize: 'var(--text-size)',
							}}
							type='text'
							placeholder='Write recipient name here'
							value={recipientNameState}
							onChange={event => setRecipientName(event.target.value)}
							required
						/>

						<TextField
							label='Recipient account number'
							sx={{
								padding: 'var(--inputPadding)',
								borderRadius: '5px',
								border: '0px',
								width: '70%',
								fontSize: 'var(--text-size)',
							}}
							type='text'
							placeholder='Write recipient account number here'
							value={recipientAccountNumberState}
							onChange={event => setRecipientAccountNumber(event.target.value)}
							required
						/>

						<TextField
							label='Category'
							sx={{
								padding: 'var(--inputPadding)',
								borderRadius: '5px',
								border: '0px',
								width: '70%',
								fontSize: 'var(--text-size)',
							}}
							type='text'
							placeholder='Write category here'
							value={categoryState}
							onChange={event => setCategory(event.target.value)}
						/>

						<br />

						<Button
							variant='contained'
							sx={{
								fontSize: 'var(--text-size2)',
								border: '1px solid #000000a8',
								alignSelf: 'center',
								borderRadius: '5px',
								padding: 'var(--inputPadding)',
							}}
							onClick={() => {
								setOpen(true);
								sendPaymentInfoAccount({
									amount: parseFloat(transactionAmountState),
									currency: currencyState,
									transactionType: transactionTypeState,
									transactionPurpose: transactionPurposeState,
									category: categoryState,
									recipient: {
										name: recipientNameState,
										accountNumber: recipientAccountNumberState,
									},
									sender: {
										accountNumber: senderAccountNumber,
									},
								})
									.then(() => {
										setOpen(false);
										alert('Payment successfuly sent!');
										sendNotification('New transaction has been made');
									})
									.catch(e => {
										setOpen(false);
										alert('Failed! ' + e.response.data, JSON.stringify(e));
										sendNotification('Transaction payment failed.');
									});
								//}
							}}
						>
							Submit
						</Button>
					</FormGroup>
				</Box>
			</Box>
		</Box>
	);
};
