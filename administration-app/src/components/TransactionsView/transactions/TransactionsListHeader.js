import '../css/Transactions.css';
export default function TransactionsListHeader() {
	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Date</th>
					<th>Recipient</th>
					<th>Amount</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
		</table>
	);
}
