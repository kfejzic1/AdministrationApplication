import React from 'react';
import { render } from '@testing-library/react';
import TransactionsListHeader from '../TransactionsView/transactions/TransactionsListHeader';

describe('TransactionsListHeader component', () => {
	test('renders table with expected headers', () => {
		const { getByText } = render(<TransactionsListHeader />);
		expect(getByText('ID')).toBeInTheDocument();
		expect(getByText('Date')).toBeInTheDocument();
		expect(getByText('Recipient')).toBeInTheDocument();
		expect(getByText('Amount')).toBeInTheDocument();
		expect(getByText('Status')).toBeInTheDocument();
	});

	test('renders a table with the correct structure', () => {
		const { getByRole } = render(<TransactionsListHeader />);
		const table = getByRole('table');
		expect(table).toBeInTheDocument();
		const tableHead = table.querySelector('thead');
		expect(tableHead).toBeInTheDocument();
		const tableRow = tableHead.querySelector('tr');
		expect(tableRow).toBeInTheDocument();
		expect(tableRow.children.length).toEqual(6);
	});
});
