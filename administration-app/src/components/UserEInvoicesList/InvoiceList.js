import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getAllUserInvoices } from '../../services/einvoiceListingService';
function InvoiceList() {
	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
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
	}, []);

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
						<TableRow key={invoice.id}>
							<TableCell>{invoice.payerName}</TableCell>
							<TableCell>{invoice.payerAddress}</TableCell>
							<TableCell>{invoice.reference}</TableCell>
							<TableCell>{invoice.description}</TableCell>
							<TableCell>{invoice.payeeName}</TableCell>
							<TableCell>{invoice.payeeAccountNumber}</TableCell>
							<TableCell>{invoice.payeeAddress}</TableCell>
							<TableCell>{invoice.amount+' '+invoice.currency.name}</TableCell>
							<TableCell>{invoice.paid ? 'Yes' : 'No'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default InvoiceList;
