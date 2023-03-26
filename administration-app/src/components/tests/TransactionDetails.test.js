import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TransactionDetails from '../transactions/TransactionDetails';

describe('Testing transactions details', () => {
	const transactionDetails = {
		id: 1,
		date: '2022-03-26',
		recipient: 'John Doe',
		amount: 100,
		status: 'Complete',
		currency: 'USD',
		nameOfThePayee: 'Jane Doe',
		bankAccount: '123456789',
		nameOfTheBank: 'Bank of America',
		methodOfPayment: 'Credit Card',
	};

	test('renders the correct transaction details', () => {
		const { getByText } = render(<TransactionDetails props={transactionDetails} />);
		expect(getByText('1')).toBeInTheDocument();
		expect(getByText('2022-03-26')).toBeInTheDocument();
		expect(getByText('John Doe')).toBeInTheDocument();
		expect(getByText('100')).toBeInTheDocument();
		expect(getByText('Complete')).toBeInTheDocument();
		expect(getByText('USD')).toBeInTheDocument();
		expect(getByText('Jane Doe')).toBeInTheDocument();
		expect(getByText('123456789')).toBeInTheDocument();
		expect(getByText('Bank of America')).toBeInTheDocument();
		expect(getByText('Credit Card')).toBeInTheDocument();
	});

	test('clicking the Close button calls setDetails function', () => {
		const setDetails = jest.fn();
		const { getByText } = render(<TransactionDetails props={{}} setDetails={setDetails} />);
		const closeButton = getByText('Close');
		fireEvent.click(closeButton);
		expect(setDetails).toHaveBeenCalledWith(null);
	});
});
