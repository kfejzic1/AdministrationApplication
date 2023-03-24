import "./Transaction.css";
export default function TransactionsListHeader() {
  return (
    <div className="container">
      <div className="column">Date</div>
      <div className="column">Recipient</div>
      <div className="column">Amount</div>
      <div className="column">Status</div>
    </div>
  );
}
