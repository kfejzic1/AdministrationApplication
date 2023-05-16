import React, { useEffect, useState } from "react";
import { Button, Typography, Grid, Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { getAllInvoices, setPaidInvoice, createEInvoiceTransaction } from '../../services/einvoicePaymentService.js'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: '50%',
    maxWidth: '90%',
    margin: 'auto',
    border: 'none',
  },
  card: {
    border: 'none',
    padding: '5px',
  },
  button: {
    marginRight: '5%',
    '&.MuiButton-contained': {
      backgroundImage: 'linear-gradient(144deg, #ffb649 35%,#ffee00)',
      borderRadius: '15px',
      color: 'black',
      width: '8rem',
      '&:hover': {
        backgroundImage: 'linear-gradient(144deg, #e9a642 65%,#e9de00)',
        boxShadow: 'none',
      },
      '&:disabled': {
        backgroundColor: '#ffffff',
        boxShadow: 'none',
        color: '#d3d3d3',
      },
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '95%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  textField: {
    minWidth: '95%',
  },
  cardActions: {
    justifyContent: 'right',
    paddingTop: 20,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatModalMessages: {
    display: 'flex',
    flexDirection: 'column',
  },
  chatModalMessage: {
    margin: '5px 10px',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '70%',
  },
  chatModalMessageUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    color: 'white',
  },
  chatModalMessageAgent: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
  },
  chatModalMessageText: {
    fontSize: '14px',
  },
  agentLink: {
    color: 'black',
  },

  userLink: {
    color: 'white',
  },
}));

function PaymentModal(props) {
  const [einvoice, setEInvoice] = useState([]);
  const [disabledPay, setDisabledPay] = useState(false);
  const classes = useStyles();

  const fetchData = async () => {
    let currency = props.invoice.currency;
    props.invoice.currencyName = currency.name;
    setEInvoice(props.invoice);
    setDisabledPay(props.invoice.paid);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePay = () => {
    let data = {
      payer: {
        name: einvoice.payerName,
        address: einvoice.payerAddress
      },
      payee: {
        name: einvoice.payeeName,
        address: einvoice.payeeAddress,
        bankAccountNumber: einvoice.payeeAccountNumber
      },
      description: einvoice.description,
      reference: einvoice.reference,
      currency: einvoice.currencyName,
      amount: einvoice.amount
    };
    createEInvoiceTransaction(data).then(res => {
      setPaidInvoice(einvoice.id).then(res => {
        props.fetchData();
        props.handleClose();
      });
    }).catch(error => {
      console.log('error', error);
    });
  };

  return (
    <div>
      <div className='container'>
        <Card className={classes.card}>
          <CardHeader align='left' title={'Payment Details'}></CardHeader>
          <CardContent>
            <Typography variant="body1">
              <strong>Payer Name:</strong> {einvoice.payerName}
            </Typography>
            <Typography variant="body1">
              <strong>Payer Address:</strong> {einvoice.payerAddress}
            </Typography>
            <Typography variant="body1">
              <strong>Reference Number:</strong> {einvoice.reference}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {einvoice.description}
            </Typography>
            <Typography variant="body1">
              <strong>Payee Name:</strong> {einvoice.payeeName}
            </Typography>
            <Typography variant="body1">
              <strong>Payee Account Number:</strong> {einvoice.payeeAccountNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Payee Address:</strong> {einvoice.payeeAddress}
            </Typography>
            <Typography variant="body1">
              <strong>Amount:</strong> {einvoice.amount}
            </Typography>
            <Typography variant="body1">
              <strong>Currency:</strong> {einvoice.currencyName}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Grid container justify='flex-end'>
              <Grid item xs={8}></Grid>
              <Grid item xs={2}>
                <Button variant='contained' className={classes.button} onClick={props.handleClose}>
                  Close
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button disabled={disabledPay} variant='contained' className={classes.button} onClick={handlePay}>
                  Pay
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default PaymentModal;
