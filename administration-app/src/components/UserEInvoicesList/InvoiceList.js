import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal } from '@mui/material';
import { getAllUserInvoices } from '../../services/einvoiceListingService';
import PaymentModal from '../PaymentInfoModal/paymentmodal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		'& .MuiTableBody-root .Mui-selectedUserIds:hover': {
			backgroundColor: '#ffc976',
		},
	},
});

function InvoiceList() {
	const classes = useStyles();
	const [invoices, setInvoices] = useState([]);
	const [selectedInvoice, setSelectedInvoice] = useState(0);
	const fetchData = async () => {
		getAllUserInvoices()
			.then(response => {
				setInvoices(response.data.map(invoice => invoice.eInvoice));
				console.log(response.data.map(invoice => invoice.eInvoice));
				/*setInvoices(
					response.data.map(invoice => {;return invoice.eInvoice;})
					);
					*/
			})
			.catch(error => console.error(error));
	};
	useEffect(() => {
		fetchData();
	}, []);

	const [openInvoice, setOpenInvoice] = useState(false);
	const handleOpenInvoice = () => setOpenInvoice(true);
	const handleCloseInvoice = () => setOpenInvoice(false);
	const handleClick = (event, invoice) => {
		setSelectedInvoice(invoice);
		handleOpenInvoice(true);
	}

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Payer Name</TableCell>
						<TableCell>Payer Address</TableCell>
						<TableCell>Reference</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Payee Name</TableCell>
						<TableCell>Payee Account Number</TableCell>
						<TableCell>Payee Address</TableCell>
						<TableCell>Amount</TableCell>
						<TableCell>Paid</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{invoices.map(invoice => (
						<TableRow key={invoice.id} onClick={event => handleClick(event, invoice)} hover 
						classes={{root: classes.tableRowRoot,selected: classes.tableRowSelected,}}>
							<TableCell>{invoice.payerName}</TableCell>
							<TableCell>{invoice.payerAddress}</TableCell>
							<TableCell>{invoice.reference}</TableCell>
							<TableCell>{invoice.description}</TableCell>
							<TableCell>{invoice.payeeName}</TableCell>
							<TableCell>{invoice.payeeAccountNumber}</TableCell>
							<TableCell>{invoice.payeeAddress}</TableCell>
							<TableCell>{invoice.amount + ' ' + invoice.currency.name}</TableCell>
							<TableCell>{invoice.paid ? 'Yes' : 'No'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Modal
				open={openInvoice}
				onClose={handleCloseInvoice}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<PaymentModal handleClose={handleCloseInvoice} invoice={selectedInvoice} fetchData={fetchData}/>
			</Modal>
		</TableContainer>
	);
}

export default InvoiceList;
