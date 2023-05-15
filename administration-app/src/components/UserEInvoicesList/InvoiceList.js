import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getAllUserInvoices } from '../../services/einvoiceListingService';
function InvoiceList() {
	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
		getAllUserInvoices()
			.then(response => {
				setInvoices(response.data);
				console.log(response.data);
			})
			.catch(error => console.error(error));
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Invoice ID</TableCell>
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
						<TableRow key={invoice.eInvoice.id}>
							<TableCell>{invoice.eInvoice.id}</TableCell>
							<TableCell>{invoice.eInvoice.payerName}</TableCell>
							<TableCell>{invoice.eInvoice.payerAdress}</TableCell>
							<TableCell>{invoice.eInvoice.reference}</TableCell>
							<TableCell>{invoice.eInvoice.description}</TableCell>
							<TableCell>{invoice.eInvoice.payeeName}</TableCell>
							<TableCell>{invoice.eInvoice.payeeAccountNumber}</TableCell>
							<TableCell>{invoice.eInvoice.payeeAdress}</TableCell>
							<TableCell>{invoice.eInvoice.amount}</TableCell>
							<TableCell>{invoice.eInvoice.paid ? 'Yes' : 'No'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default InvoiceList;
