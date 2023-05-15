import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function InvoiceList() {
	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
		const fetchInvoices = async () => {
			const response = await fetch('/api/invoices');
			const data = await response.json();
			setInvoices(data);
		};

		fetchInvoices();
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
						<TableCell>Currency</TableCell>
						<TableCell>Paid</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{invoices.map(invoice => (
						<TableRow key={invoice.Id}>
							<TableCell>{invoice.Id}</TableCell>
							<TableCell>{invoice.PayerName}</TableCell>
							<TableCell>{invoice.PayerAdress}</TableCell>
							<TableCell>{invoice.Reference}</TableCell>
							<TableCell>{invoice.Description}</TableCell>
							<TableCell>{invoice.PayeeName}</TableCell>
							<TableCell>{invoice.PayeeAccountNumber}</TableCell>
							<TableCell>{invoice.PayeeAdress}</TableCell>
							<TableCell>{invoice.Amount}</TableCell>
							<TableCell>{invoice.CurrencyId}</TableCell>
							<TableCell>{invoice.Paid ? 'Yes' : 'No'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default InvoiceList;
