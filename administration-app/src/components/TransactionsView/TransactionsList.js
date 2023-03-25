import { getBasicTransactions } from "../../services/TransactionsView/transactionsService";
import TransactionsListHeader from "./TransactionsListHeader";
import Transaction from "./Transaction";
import { useState, useEffect } from "react";
import "./Transaction.css";
import TransactionDetails from "./TransactionDetails";
import React from "react";

export const TransactionsList = () => {
  const [details, setDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  var counter = 1;

  useEffect(() => {
    loadTransactions();
    window.addEventListener("scroll", handleScroll);
  }, []);

  function loadTransactions() {
    setIsLoading(true);
    console.log(hasMore);
    console.log(counter);
    //fetch() or axios.get()
    var result = getBasicTransactions(counter * 15);
    var transactionsdata = result.data.map((item, index) => (
      <Transaction
        setDetails={setDetails}
        index={index}
        prop={item}
      ></Transaction>
    ));
    setTransactions(transactionsdata);
    setHasMore(result.hasMore);
    counter = counter + 1;
    setIsLoading(false);
  }

  function handleScroll(e) {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      0.1
    ) {
      loadTransactions();
    }
  }

  return (
    <div className="transactions-root">
      {details != null ? (
        <TransactionDetails
          setDetails={setDetails}
          props={details}
        ></TransactionDetails>
      ) : (
        <div>
          <h2 className="heading">Transactions</h2>
          <TransactionsListHeader></TransactionsListHeader> {transactions}
        </div>
      )}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};
