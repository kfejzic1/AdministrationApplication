import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { sendPaymentInfo } from '../../services/Payment/PaymentServices';

import { TextField, Button, FormControl, Select, MenuItem, Menu, Typography, Box, InputLabel } from '@mui/material';

import Modal from '@mui/material/Modal';

export const Payment = props => {
	const { currency, recipientAccountNumber, recipientName, transactionAmount, type, description, category, transactionType, interestingGroup, phoneNumber } = useParams();
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
	const [descriptionState, setDescription] = useState(description != undefined && description != -1 ? description : '');
	const [categoryState, setCategory] = useState(category != undefined && category != -1 ? category : '')
	const [interestingGroupState, setInterestingGroup] = useState(interestingGroup != undefined && interestingGroup != -1 ? interestingGroup : 'Person');
	const [transactionTypeState, setTransactionType] = useState(transactionType != undefined && transactionType != -1 ? transactionType : 'B2C');
	const [phoneNumberState, setPhoneNumber] = useState(phoneNumber != undefined && phoneNumber != -1 ? phoneNumber : '');


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
  
	const handleButtonClick = (button) => {
	  setClickedButton(button);
	  setOpen(false);
	}
  
	return (
	  <Box>
		<Modal open={open}>
		  <Box sx = {{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh'
		  }}>
			<Typography>Please select one of the following options</Typography>
			<Box>
				<Button variant="contained" onClick={() => handleButtonClick('recipientName')} sx = {{marginRight: '10px'}}>Recipient name</Button>
				<Button variant="contained" onClick={() => handleButtonClick('phoneNumber')}>Phone number</Button>
			</Box>
		  </Box>
		</Modal>
		{clickedButton=='recipientName' && 
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

					<FormControl
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
									Type:{' '}
								</Box>
							</Box>
							<Select
								sx={{
									color: '#fff',
									backgroundColor: '#1976D2', // change color Type
									alignSelf: 'flex-end',
									borderRadius: '5px',
									padding: 0,
									//fontSize: 'var(--text-size)',
									lineHeight: 1,
								}}
								value={typeState}
								onChange={event => setType(event.target.value)}
							>
								<MenuItem value='Credit'>Credit</MenuItem>
								<MenuItem value='Payment'>Payment</MenuItem>
								<MenuItem value='Recip'>Recip</MenuItem>
								<MenuItem value='Gift'>Gift</MenuItem>
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
							<Select
								sx={{
									color: '#fff',
									backgroundColor: '#1976D2', // change color Currency
									alignSelf: 'flex-end',
									borderRadius: '5px',
									padding: 0,
									// fontSize: 'var(--text-size)',
									lineHeight: 1,
								}}
								value={currencyState}
								onChange={event => setCurrency(event.target.value)}
							>
								<MenuItem value='EUR'>EUR</MenuItem>
								<MenuItem value='USD'>USD</MenuItem>
								<MenuItem value='BAM'>BAM</MenuItem>
								<MenuItem value='JPY'>JPY</MenuItem>
								<MenuItem value='GBP'>GBP</MenuItem>
								<MenuItem value='CAD'>CAD</MenuItem>
								<MenuItem value='AUD'>AUD</MenuItem>
								<MenuItem value='CHF'>CHF</MenuItem>
								<MenuItem value='CNY'>CNY</MenuItem>
								<MenuItem value='NZD'>NZD</MenuItem>
								<MenuItem value='MXN'>MXN</MenuItem>
								<MenuItem value='BRL'>BRL</MenuItem>
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
							>
								<Box
									sx={{
										color: 'var(--babyblue)',
										display: 'inline-block',
									}}
								>
									Transaction type:
								</Box>
							</Box>
							<Select
								sx={{
									color: '#fff',
									backgroundColor: '#1976D2', // change color Type
									alignSelf: 'flex-end',
									borderRadius: '5px',
									padding: 0,
									//fontSize: 'var(--text-size)',
									lineHeight: 1,
								}}
								value={transactionTypeState}
								onChange={event => setTransactionType(event.target.value)}
							>
								<MenuItem value='B2B'>B2B</MenuItem>
								<MenuItem value='B2C'>B2C</MenuItem>
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
									Interesting group:
								</Box>
							</Box>

							<Select
								sx={{
									color: '#fff',
									backgroundColor: '#1976D2', // change color Currency
									alignSelf: 'flex-end',
									borderRadius: '5px',
									padding: 0,
									// fontSize: 'var(--text-size)',
									lineHeight: 1,
								}}
								value={interestingGroupState}
								onChange={event => setInterestingGroup(event.target.value)}
							>
								<MenuItem value='Person'>Person</MenuItem>
								<MenuItem value='Company'>Company</MenuItem>
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
					
						<TextField
							label='Description'
							sx={{
								padding: 'var(--inputPadding)',
								borderRadius: '5px',
								border: '0px',
								width: '70%',
								fontSize: 'var(--text-size)',
							}}
							type='text'
							placeholder='Write description here'
							value={descriptionState}
							onChange={event => setDescription(event.target.value)}
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
								const [first, last] = recipientNameState.split(' ');

								sendPaymentInfo({
									amount: parseFloat(transactionAmountState),
									currency: currencyState,
									paymentType: typeState,
									description: descriptionState,
									category: categoryState,
									recipientAccountNumber: recipientAccountNumberState,
									recipientFirstName: first,
									recipientLastName: last
								}).then(() => {
										alert('Payment successfuly sent!');
									}).catch(() => {
										alert('Failed!');
									});

									console.log(
										'Sta se salje backendu: ',
										transactionAmountState,
										currencyState,
										typeState,
										descriptionState,
										categoryState,
										recipientAccountNumberState,
										recipientNameState
									);
								}}
						>
							Submit
						</Button>
					</FormControl>
				</Box>
			</Box>
		}










		{clickedButton=='phoneNumber' &&
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

					<FormControl
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
									Type:{' '}
								</Box>
							</Box>
							<Select
								sx={{
									color: '#fff',
									backgroundColor: '#1976D2', // change color Type
									alignSelf: 'flex-end',
									borderRadius: '5px',
									padding: 0,
									//fontSize: 'var(--text-size)',
									lineHeight: 1,
								}}
								value={typeState}
								onChange={event => setType(event.target.value)}
							>
								<MenuItem value='Credit'>Credit</MenuItem>
								<MenuItem value='Payment'>Payment</MenuItem>
								<MenuItem value='Recip'>Recip</MenuItem>
								<MenuItem value='Gift'>Gift</MenuItem>
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
							<Select
								sx={{
									color: '#fff',
									backgroundColor: '#1976D2', // change color Currency
									alignSelf: 'flex-end',
									borderRadius: '5px',
									padding: 0,
									// fontSize: 'var(--text-size)',
									lineHeight: 1,
								}}
								value={currencyState}
								onChange={event => setCurrency(event.target.value)}
							>
								<MenuItem value='EUR'>EUR</MenuItem>
								<MenuItem value='USD'>USD</MenuItem>
								<MenuItem value='BAM'>BAM</MenuItem>
								<MenuItem value='JPY'>JPY</MenuItem>
								<MenuItem value='GBP'>GBP</MenuItem>
								<MenuItem value='CAD'>CAD</MenuItem>
								<MenuItem value='AUD'>AUD</MenuItem>
								<MenuItem value='CHF'>CHF</MenuItem>
								<MenuItem value='CNY'>CNY</MenuItem>
								<MenuItem value='NZD'>NZD</MenuItem>
								<MenuItem value='MXN'>MXN</MenuItem>
								<MenuItem value='BRL'>BRL</MenuItem>
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
							>
								<Box
									sx={{
										color: 'var(--babyblue)',
										display: 'inline-block',
									}}
								>
									Transaction type:
								</Box>
							</Box>
							<Select
								sx={{
									color: '#fff',
									backgroundColor: '#1976D2', // change color Type
									alignSelf: 'flex-end',
									borderRadius: '5px',
									padding: 0,
									//fontSize: 'var(--text-size)',
									lineHeight: 1,
								}}
								value={transactionTypeState}
								onChange={event => setTransactionType(event.target.value)}
							>
								<MenuItem value='B2B'>B2B</MenuItem>
								<MenuItem value='B2C'>B2C</MenuItem>
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
									Interesting group:
								</Box>
							</Box>

							<Select
								sx={{
									color: '#fff',
									backgroundColor: '#1976D2', // change color Currency
									alignSelf: 'flex-end',
									borderRadius: '5px',
									padding: 0,
									// fontSize: 'var(--text-size)',
									lineHeight: 1,
								}}
								value={interestingGroupState}
								onChange={event => setInterestingGroup(event.target.value)}
							>
								<MenuItem value='Person'>Person</MenuItem>
								<MenuItem value='Company'>Company</MenuItem>
							</Select>
						</Box>

						<br />

						<TextField
							label='Phone Number'
							sx={{
								padding: 'var(--inputPadding)',
								borderRadius: '5px',
								border: '0px',
								width: '70%',
								fontSize: 'var(--text-size)',
							}}
							type='text'
							placeholder='Write recipient name here'
							value={phoneNumberState}
							onChange={event => setPhoneNumber(event.target.value)}
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
					
						<TextField
							label='Description'
							sx={{
								padding: 'var(--inputPadding)',
								borderRadius: '5px',
								border: '0px',
								width: '70%',
								fontSize: 'var(--text-size)',
							}}
							type='text'
							placeholder='Write description here'
							value={descriptionState}
							onChange={event => setDescription(event.target.value)}
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

								sendPaymentInfo({
									amount: parseFloat(transactionAmountState),
									currency: currencyState,
									paymentType: typeState,
									description: descriptionState,
									category: categoryState,
									phoneNumber: phoneNumberState
								}).then(() => {
										alert('Payment successfuly sent!');
									}).catch(() => {
										alert('Failed!');
									});
								
								console.log(
										'Sta se salje backendu: ',
										transactionAmountState,
										currencyState,
										typeState,
										descriptionState,
										categoryState,
										phoneNumberState
								);
							}}
						>
							Submit
						</Button>
					</FormControl>
				</Box>
			</Box>
		}
	  </Box>
	);

};
