import { getBasicTransactions } from "../../services/TransactionsView/transactionsService";
import TransactionsListHeader from "./TransactionsListHeader";
import Transaction from "./Transaction";
import { useState } from "react";
import "./Transaction.css";
import TransactionDetails from "./TransactionDetails";
export const TransactionsList = () => {
  const [details, setDetails] = useState(null);
  var transactions = getBasicTransactions().map((item, index) => (
    <Transaction
      setDetails={setDetails}
      index={index}
      prop={item}
    ></Transaction>
  ));
  return (
    <div className="root">
      {details != null ? (
        <TransactionDetails
          setDetails={setDetails}
          props={details}
        ></TransactionDetails>
      ) : (
        <div>
          <TransactionsListHeader></TransactionsListHeader> {transactions}
        </div>
      )}
    </div>
  );
};
