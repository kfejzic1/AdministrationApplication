import {
  getGroupTransactions,
  getTransactions,
} from "../../../services/TransactionsView/transactionsService";
import Transaction from "./Transaction";
import { useState, useEffect } from "react";
import TransactionDetails from "./TransactionDetails";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  createTheme,
  Box,
  Button,
  Table,
  TableBody,
  TableContainer,
  Paper,
  Typography,
  ThemeProvider,
} from "@mui/material";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import TransactionsListHeader from "./TransactionsHeader";
import Modal from "@material-ui/core/Modal";
import Group from "./Group";
export const TransactionsList = (arg) => {
  const [alertShowing, setAlertShowing] = useState(false);
  const [mock, setMock] = useState(false);
  const [filterOptions, setFilterOptions] = useState(null);
  const [details, setDetails] = useState(null);
  const [transactionsRaw, setTransactionsRaw] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [schouldLoad, setSchouldLoad] = useState(false);
  const [counter, setCounter] = useState(1);
  const [groupBy, setGroupBy] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (hasMore) {
      loadTransactions();
      setSchouldLoad(false);
    }
  }, [schouldLoad]);
  useEffect(() => {
    loadTransactions();
    setSchouldLoad(false);
  }, [mock]);
  useEffect(() => {
    //console.log('treba lo bi da rai');
    setHasMore(true);
    setCounter(1);
    loadTransactions("clear-load");
  }, [filterOptions, groupBy]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  function loadTransactions(a) {
    var tempCounter = counter;
    setIsLoading(true);
    if (a == "clear-load") {
      setCounter(1);
      tempCounter = 1;
    }
    if (groupBy != "") {
      getGroupTransactions(groupBy, mock).then((groups) => {
        console.log("groupe=", JSON.stringify(groups));
        var transactionsdata = groups.map((item, index) => (
          <Group
            key={item.keyValue}
            setDetails={setDetails}
            data={item}
          ></Group>
        ));
        setTransactions(transactionsdata);
        setHasMore(true);
        setCounter(counter + 1);
        setIsLoading(false);
      });
    } else
      getTransactions(tempCounter, 15, filterOptions, mock)
        .then((transactions1) => {
          if (transactions1.data.length == 0 && tempCounter != 1) {
            setHasMore(false);
            setIsLoading(false);
          } else {
            //console.log('No tran2sactions');
            var temp1 = [...transactionsRaw, ...transactions1.data];
            if (transactions1.data.length == 0) temp1 = transactions1.data;
            if ("clear-load" == a) {
              temp1 = transactions1.data;
            }
            //console.log(transactions1.data, 'tempkj');
            setTransactionsRaw(temp1);
            var transactionsdata = temp1.map((item, index) => (
              <Transaction
                key={item.id}
                setDetails={setDetails}
                index={index}
                prop={item}
              ></Transaction>
            ));

            setTransactions(transactionsdata);
            setHasMore(true);
            setCounter(counter + 1);
            setIsLoading(false);
          }
        })
        .catch((e) => {
          if (e == 401 && !alertShowing) {
            setAlertShowing(true);
          } else {
            setHasMore(false);
            setIsLoading(false);
          }
        });
  }

  function handleScroll(e) {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      0.1
    ) {
      setSchouldLoad(true);
    }
  }
  const theme = createTheme({
    components: {
      // Name of the component
      MuiButton: {
        defaultProps: {
          // The props to change the default for.
          variant: "contained", // No more ripple, on the whole application 💣!
        },
      },
    },
  });
  function openClaims() {
    window.location.assign(`/transaction/claims`);
  }
  console.log("transactionLise ", groupBy);
  return (
    <Box>
      <ThemeProvider theme={theme}>
        {details != null ? (
          // ovdje treba uraditi rutu na localhost:3000/transaction/id/brojId
          <TransactionDetails
            alertShowing={alertShowing}
            setAlertShowing={setAlertShowing}
            setPaymentInfo={arg.setPaymentInfo}
            setIsLoading={setIsLoading}
            setDetails={setDetails}
            mock={mock}
            props={details}
          ></TransactionDetails>
        ) : (
          <Box sx={{ bgcolor: "#eceff1" }}>
            <Typography
              variant="h2"
              sx={{ bgcolor: "#fff", width: "100%", pb: 3 }}
              align="center"
            >
              <Button
                variant="text"
                sx={{
                  color: "#000",
                  fontSize: 30,
                  fontFamily: !mock ? "fantasy" : "roboto",
                }}
                onClick={() => {
                  setMock(!mock);
                }}
              >
                Transactions
              </Button>
            </Typography>
            <Box display={"flex"} justifyContent={"right"} marginRight={"2%"} marginTop={"1%"}>
				<Button
				variant="contained"
				sx={{
					paddingLeft: "10px",
					paddingRight: "10px"
				}}
				onClick={openClaims}> My Claims </Button>
			</Box>
            <Box sx={{ width: "95%", margin: "auto", pt: "15px" }}>
              <Paper sx={{ width: "100%", mb: 2, border: "none" }}>
                <TableContainer>
                  <Table>
                    <TransactionsListHeader
                      setGroupBy={setGroupBy}
                      groupBy={groupBy}
                      setFilterOptions={setFilterOptions}
                    ></TransactionsListHeader>
                    <TableBody>{transactions}</TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          </Box>
        )}
        {hasMore && isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingSpinner></LoadingSpinner>
          </Box>
        )}
      </ThemeProvider>
      <Modal
        open={false} //{alertShowing}
        onClose={() => {
          navigate("/login");
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f44336",
            color: "#fff",
            padding: 7,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "9999",
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography>
            Your session has been expired, please login again.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            align="center"
            sx={{ mt: 3 }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
