import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Transaction from '../TransactionsView/transactions/Transaction';

describe('Transaction', () => {
	const props = {
		prop: {
			id: 1,
			dateTime: '2008-05-01T08:30:52',
			recipient: 'Enver',
			amount: 30,
			status: 'Pending',
		},
		setDetails: jest.fn(),
	};

	it('renders a table row with transaction data', () => {
		const { getByText } = render(<Transaction {...props} />);
		expect(getByText('1')).toBeInTheDocument();
		expect(getByText('08:30:52 01.05.2008')).toBeInTheDocument();
		expect(getByText('Enver')).toBeInTheDocument();
		expect(getByText('30')).toBeInTheDocument();
		expect(getByText('Pending')).toBeInTheDocument();
		expect(getByText('Details')).toBeInTheDocument();
	});

	it('calls setDetails function when details button is clicked', () => {
		const { getByText } = render(<Transaction {...props} />);
		const detailsBtn = getByText('Details');
		fireEvent.click(detailsBtn);
		expect(props.setDetails).toHaveBeenCalledWith(props.prop);
	});
});
