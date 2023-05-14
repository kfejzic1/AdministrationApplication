import React, { useState } from "react";

function PaymentModal({
  payerName,
  payerAddress,
  referenceNumber,
  description,
  payeeAccountNumber,
  payeeName,
  payeeAddress,
  amount,
  onClose,
  onPay,
}) {
  const [isPaying, setIsPaying] = useState(false);

  const handlePay = () => {
    setIsPaying(true);
    onPay();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Payment Details</h2>
        <div>
          <label>Payer Name:</label>
          <span>{payerName}</span>
        </div>
        <div>
          <label>Payer Address:</label>
          <span>{payerAddress}</span>
        </div>
        <div>
          <label>Reference Number:</label>
          <span>{referenceNumber}</span>
        </div>
        <div>
          <label>Description:</label>
          <span>{description}</span>
        </div>
        <div>
          <label>Payee Account Number:</label>
          <span>{payeeAccountNumber}</span>
        </div>
        <div>
          <label>Payee Name:</label>
          <span>{payeeName}</span>
        </div>
        <div>
          <label>Payee Address:</label>
          <span>{payeeAddress}</span>
        </div>
        <div>
          <label>Amount:</label>
          <span>{amount}</span>
        </div>
        <button className="pay-button" onClick={handlePay} disabled={isPaying}>
          {isPaying ? "Paying..." : "Pay"}
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;