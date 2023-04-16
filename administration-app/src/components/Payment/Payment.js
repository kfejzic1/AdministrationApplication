import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { sendPaymentInfoAccount, sendPaymentInfoPhone } from '../../services/Payment/PaymentServices';
import { useLocation } from 'react-router-dom';

import { TextField, Button, FormGroup, Select, MenuItem, Menu, Typography, Box, InputLabel } from '@mui/material';

import Modal from '@mui/material/Modal';

export const Payment = props => {
	const { currency, recipientAccountNumber, recipientName, transactionAmount, type, description, category, transactionPurpose, interestingGroup, phoneNumber } = useParams();
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
	const [transactionPurposeState, settransactionPurpose] = useState(transactionPurpose != undefined && transactionPurpose != -1 ? transactionPurpose : 'B2C');
	const [phoneNumberState, setPhoneNumber] = useState(phoneNumber != undefined && phoneNumber != -1 ? phoneNumber : '');


	const location = useLocation();
    const isPopUp = location.state?.isPopUp || false;
	const isRecipient = location.state?.isRecipient;
	const isPhoneNumber = location.state?.isPhoneNumber;

	/*console.log("Da li ugasiti modal:", isPopUp);
	console.log("Da li je recipient ovo:", isRecipient);
	console.log("Da li je ovo broj telefona: ", isPhoneNumber)*/


	useEffect(() => {
		if (transactionPurposeState != undefined && transactionPurposeState === 'B2B') {
		  setInterestingGroup('Company');
		} else if (transactionPurposeState != undefined && (transactionPurposeState === 'B2C' || transactionPurposeState === 'C2C')) {
		  setInterestingGroup('Person');
		} else if (transactionPurposeState != undefined && transactionPurposeState === 'C2B') {
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

	const [open, setOpen] = useState(!isPopUp);
	const [clickedButton, setClickedButton] = useState('');
  
	const handleButtonClick = (button) => {
	  setClickedButton(button);
	  setOpen(false);
	}
  
	const isValidAccountNumber = /^\d+$/.test(recipientAccountNumberState); // ne znamo kolika je duzina broja racuna, backend nam nista ne govori, po pravilo je to niz od 16 brojeva
	// console.log(isValidAccountNumber)
	
	const isValidRecipientName = /^[a-z]{2,}\s[a-z]{3,}(-[a-z]{3,})?(?:\s[a-z]{3,})?$/i.test(recipientNameState)
	// console.log("Da li je validno ime: ", isValidAccountNumber)
	// RecipientName has following forms: FirstName LastName, FirstName LastName-LastName, FirstName LastName LastName

	const isValidPhoneNumber = /^[+]?(\d+-)*(\d+-\d+|\d+)$/.test(phoneNumberState) // opet nije definisano koliko moze biti dug broj, zatim koji je oblik broja, da li smije sadrzavati crtice ili u mockupi sadrzi crtice, a u Kenanovom primjeru ne sadrzi


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
		{(clickedButton=='recipientName' || isRecipient) && 
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
								<MenuItem value='ZAR'>ZAR</MenuItem>
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
									Party:
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
									Purpose:
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
								value={transactionPurposeState}
								onChange={event => settransactionPurpose(event.target.value)}
							>
								<MenuItem value='B2B'>B2B</MenuItem>
								<MenuItem value='B2C'>B2C</MenuItem>
								<MenuItem value='C2B'>C2B</MenuItem>
								<MenuItem value='C2C'>C2C</MenuItem>
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
							error={!isValidRecipientName}
							helperText={!isValidRecipientName && "Name needs to be in form: 'F L, F L-L, F L L'"}
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
							error={!isValidAccountNumber}
							helperText={!isValidAccountNumber && "Account number must contain only numbers"}
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
								if(isValidAccountNumber && isValidRecipientName) {
									/* const [first, lastPrimary, lastSecondary] = recipientNameState.split(/[\s-]+/)
									const regexForSpace = /\s/g
									const numberOfSpaces = recipientNameState.match(regexForSpace).length
									let last = '';
									if(recipientNameState.includes('-')) 
										last = lastPrimary + '-' + lastSecondary
									else if(numberOfSpaces == 2)
										last = lastPrimary + ' ' + lastSecondary
									else
										last = lastPrimary */ // SAD JE BACKEND ODLUCIO DA SE SALJE FULLNAME, AKO PROMIJENE MISLJENJE SAMO SE ODKOMENTARISE OVAJ KOD JER RADI

									sendPaymentInfoAccount({
										amount: parseFloat(transactionAmountState),
										currency: currencyState,
										transactionType: typeState,
										transactionPurpose: transactionPurposeState,
										category: categoryState,
										recipient: {
											name: recipientNameState,
											accountNumber: recipientAccountNumberState
										}
									}).then(() => {
											alert('Payment successfuly sent!');
										}).catch(() => {
											alert('Failed!');
										});
	
								} 
							}}
						>
							Submit
						</Button>
					</FormGroup>
				</Box>
			</Box>
		}



		{(clickedButton=='phoneNumber' || isPhoneNumber) &&
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
								<MenuItem value='ZAR'>ZAR</MenuItem>
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
									Party:
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
									Purpose:
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
								value={transactionPurposeState}
								onChange={event => settransactionPurpose(event.target.value)}
							>
								<MenuItem value='B2B'>B2B</MenuItem>
								<MenuItem value='B2C'>B2C</MenuItem>
								<MenuItem value='C2B'>C2B</MenuItem>
								<MenuItem value='C2C'>C2C</MenuItem>
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
							error={!isValidPhoneNumber}
							helperText={!isValidPhoneNumber && "Phone number must contains only numbers (optionally '+' on start)"}
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
								
								if(isValidPhoneNumber) {
									sendPaymentInfoPhone({
										amount: parseFloat(transactionAmountState),
										currency: currencyState,
										transactionType: typeState,
										transactionPurpose: transactionPurposeState,
										category: categoryState,
										recipientByPhone: {
											phoneNumber: phoneNumberState
										}
									}).then(() => {
											alert('Payment successfuly sent!');
										}).catch(() => {
											alert('Failed!');
										});
								}
							}}
						>
							Submit
						</Button>
					</FormGroup>
				</Box>
			</Box>
		}
	  </Box>
	);
};
