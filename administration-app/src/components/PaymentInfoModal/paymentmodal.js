import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

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
    <Dialog open onClose={onClose}>
      <DialogTitle>Payment Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          <strong>Payer Name:</strong> {payerName}
        </Typography>
        <Typography variant="body1">
          <strong>Payer Address:</strong> {payerAddress}
        </Typography>
        <Typography variant="body1">
          <strong>Reference Number:</strong> {referenceNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> {description}
        </Typography>
        <Typography variant="body1">
          <strong>Payee Account Number:</strong> {payeeAccountNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Payee Name:</strong> {payeeName}
        </Typography>
        <Typography variant="body1">
          <strong>Payee Address:</strong> {payeeAddress}
        </Typography>
        <Typography variant="body1">
          <strong>Amount:</strong> {amount}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handlePay} disabled={isPaying}>
          {isPaying ? "Paying..." : "Pay"}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentModal;
