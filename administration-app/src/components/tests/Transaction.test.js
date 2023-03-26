import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Transaction from '../transactions/Transaction';

describe('Transaction', () => {
	const props = {
		prop: {
			id: 1,
			date: '2022-01-01',
			recipient: 'John Doe',
			amount: 1000,
			status: 'pending',
		},
		setDetails: jest.fn(),
	};

	it('renders a table row with transaction data', () => {
		const { getByText } = render(<Transaction {...props} />);
		expect(getByText('1')).toBeInTheDocument();
		expect(getByText('2022-01-01')).toBeInTheDocument();
		expect(getByText('John Doe')).toBeInTheDocument();
		expect(getByText('1000')).toBeInTheDocument();
		expect(getByText('pending')).toBeInTheDocument();
		expect(getByText('Details')).toBeInTheDocument();
	});

	it('calls setDetails function when details button is clicked', () => {
		const { getByText } = render(<Transaction {...props} />);
		const detailsBtn = getByText('Details');
		fireEvent.click(detailsBtn);
		expect(props.setDetails).toHaveBeenCalledWith(props.prop);
	});
});
