import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import styles from '../Currencies/Currencies.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { createCurrency, createExchangeRate, createExchangeTransaction, getAllAcounts, getAllCurrencies, getAllExchangeRates, getUserAccounts, getUserTransactions } from "../../services/currencyService";

import { getUser } from "../../services/userService";
import { getUserByName } from "../../services/userService";
import { getAllUsers } from "../../services/userService";

export default function Currencies() {

    function getStartDate(params) {
        
        for (let item of currentCurrency.exchangeRates) {
            if (item.outputCurrencyId == params.id)
                console.log('params ', item.startDate)

            return item.startDate

        }
        // for (let item of params.row.exchangeRates) {
        //     if (item.outputCurrencyId == currentCurrency.id) {
        //         console.log(params.row.id);
        //         console.log(item.startDate);
        //     }
        // }
        return params

    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 100, headerAlign: 'center', align: 'center' },
        { field: 'inputCurrency', headerName: 'Input Currency', width: 300, headerAlign: 'center', align: 'center' },
        { field: 'outputCurrency', headerName: 'Output Currency', width: 300, headerAlign: 'center', align: 'center' },
        { field: 'rate', headerName: 'Rate', width: 300, headerAlign: 'center', align: 'center' },
        {
            field: 'startDate', headerName: 'Start Date', width: 300, headerAlign: 'center', align: 'center',

        },
        { field: 'endDate', headerName: 'End Date', width: 300, headerAlign: 'center', align: 'center' }
    ]
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserNumber, setCurrentUserNumber] = useState('');

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetchExchangeRates();
        fetchCurrencies();
        fetchCurrentUser();
        fetchAllAccounts();
        fetchUserAccounts();


    }, []);
    const [selectedUser, setSelectedUser] = useState({})
    const [currencies, setCurrencies] = useState([]);
    const [exchanges, setExchanges] = useState([]);
    const [open, setOpen] = useState(false);
    const [openRequests, setOpenRequests] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [currentCurrency, setCurrentCurrency] = useState({})
    const [inputCurrency, setInputCurrency] = useState('');
    const [outputCurrency, setOutputCurrency] = useState('');
    const [rate, setRate] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [amount, setAmount] = useState('');
    const [transactionCurrency, setTransactionCurrency] = useState({});
    const [userTransactionAccount, setUserTransactionAccount] = useState({})

    const [transactions, setTransactions] = useState([]);
    const [transactionPurpose, setTransactionPurpose] = useState('');

    const [allAccounts, setAllAccounts] = useState([]);
    const [userAccounts, setUserAccounts] = useState([])

    const [sender, setSender] = useState({
        accountNumber: ''
    })
    const [recipient, setRecipient] = useState({
        name: '',
        accountNumber: ''
    })

    const [exchangeUnavailable, setExchangeUnavailable] = useState(false);

    const [convertedAmount, setConvertedAmount] = useState('');

    useEffect(() => {
        if (amount && userTransactionAccount && selectedUser) {
          convertCurrency();
        }
      }, [amount, userTransactionAccount, selectedUser]);

    const convertCurrency = async () => {
        setConvertedAmount('');
        for(const exchange of exchanges){  
        const regex = /\(([^)]+)\)/; 
        const match = exchange.inputCurrency.match(regex);
        const match2 = exchange.outputCurrency.match(regex);

        if (match && match2) {
        const result = match[1]; 
        const result2 = match2[1]; 
        if(result==userTransactionAccount.currency && result2==selectedUser.currency){
            const convertedAmount = (amount * exchange.rate).toFixed(2);
            setConvertedAmount(convertedAmount);
        }
        }

    }
      };


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewCurrency(
            {
                id: '0',
                country: '',
                name: ''
            }
        )
    }
    const [openExchange, setOpenExchange] = useState(false);
    const [openExchangeTransaction, setOpenExchangeTransaction] = useState(false);
    const handleOpenExchange = () => setOpenExchange(true);
    const handleOpenRequests = () => {
        fetchTransactions();
        setOpenRequests(true);
    }
    const handleCloseRequests = () => setOpenRequests(false);

    const handleOpenExchangeTransaction = () => setOpenExchangeTransaction(true);
    const handleCloseExchangeTransaction = () => setOpenExchangeTransaction(false);
    const handleCloseExchange = () => {
        setOpenExchange(false);
        setNewExchange(
            {
                id: '0',
                inputCurrencyId: '0',
                outputCurrencyId: '0',
                startDate: new Date(),
                endDate: new Date()
            }
        )
    }

    const fetchCurrentUserNumber = async (username) => {
        getUserByName(username).then(res => {
            setCurrentUserNumber(res.data);
        })
    }

    const fetchAllAccounts = async () => {
        getAllAcounts().then(res => {
            setAllAccounts(res.data);
        })
    }

    const fetchCurrencies = async () => {
        getAllCurrencies().then(res => {
            
            if (res.data.length != 0)
                setCurrencies(res.data);
        });
    };
    const fetchCurrentUser = async () => {
        getUser().then(res => {
            setCurrentUser(res.data);

            fetchCurrentUserNumber(res.data.userName);
        })
    }
    const fetchExchangeRates = async () => {
        getAllExchangeRates().then(res => {
            
            if (res.data.length != 0)
                setExchanges(res.data);
        });
    };
    const fetchUserAccounts = async () => {
        getUserAccounts().then(res => {
            if (res.data.length != 0) {
                setUserAccounts(res.data)
            }
        })
    }
    const fetchTransactions = async () => {
        getUserTransactions().then(res => {
            if (res.status == 200) {
                setTransactions(res.data)
            }
            else {
                setTransactions([]);
            }
        })
    }

    const [openCurrencyList, setOpenCurrencyList] = useState(false);
    const handleOpenCurrencyList = () => {
        fetchCurrencies();
        setOpenCurrencyList(true);

    }
    const handleCloseCurrencyList = () => {
        setOpenCurrencyList(false);
    }

    const [newCurrency, setNewCurrency] = useState({
        id: '0',
        country: '',
        name: ''
    })
    const [newExchange, setNewExchange] = useState({
        id: '0',
        inputCurrencyId: '0',
        outputCurrencyId: '0',
        startDate: new Date(),
        endDate: new Date()
    })






    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '35%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleNewCountryChange = (event) => {
        setNewCurrency({
            id: 0,
            country: event.target.value,
            name: newCurrency.name
        })
        setIsValid(true);
    }
    const handleNewCurrencyNameChange = (event) => {
        setNewCurrency({
            id: 0,
            country: newCurrency.country,
            name: event.target.value
        })
        setIsValid(true);
    }

    const onCreateCurrency = () => {
        newCurrency.id = currencies.length + 1;
        if (newCurrency.country.trim() != '' && newCurrency.name.trim() != '') {
            createCurrency({ country: newCurrency.country, name: newCurrency.name })
                .then(res => {
                    fetchCurrencies();

                })
                .catch(error => {
                    console.log('error', error);
                });

            // setCurrencies((prevState) => {
            //     return [...prevState, newCurrency];
            // });
            handleClose();

        }
        else {
            setIsValid(false);
        }
    }
    const onCreateExchangeTransaction = (event) => {
        event.preventDefault();

        const newExchangeTransaction = {
            amount: +amount,
            SenderCurrency: userTransactionAccount.currency,
            RecipientCurrnecy: selectedUser.currency,
            transactionPurpose: transactionPurpose,
            sender: {
                accountNumber: userTransactionAccount.accountNumber
            },
            recipient: {
                name: selectedUser.owner.name,
                accountNumber: selectedUser.accountNumber
            }
        }

        createExchangeTransaction(newExchangeTransaction).then(res => {

            
            // if (res.data.message.includes('not available')) {
            //     setExchangeUnavailable(true);
            // }
            // else{
            //     setExchangeUnavailable(false);
            // }
            alert('The new exchange transaction has been successfully added.');
            handleCloseExchangeTransaction()
        })
        .catch(err => {
            alert('There was an error adding the exchange transaction.');
            console.log(err)
        })
    }
    const onCreateExchange = (event) => {
        event.preventDefault();
        if (error === '') {
            // Find the currency objects that match the selected input and output currencies
            const inputCurrencyObj = currencies.find((currency) => currency.id === inputCurrency);
            const outputCurrencyObj = currencies.find((currency) => currency.id === outputCurrency);

            

            // Find the exchange rate object that matches the input and output currencies
            // const exchangeRate = inputCurrencyObj.exchangeRates.find((rate) => rate.outputCurrencyId === outputCurrencyObj.id);

            // Display the exchange rate in the table
            // if (exchangeRate) {
            const newExchange = {
                id: exchanges.length + 1,
                country: `${inputCurrencyObj.country} - ${outputCurrencyObj.country}`,
                name: `${inputCurrencyObj.name} - ${outputCurrencyObj.name}`,
                rate: rate,
                startDate: startDate,
                endDate: endDate
            };
            
            
            
            
            
            createExchangeRate({
                inputCurreny: `${inputCurrencyObj.country} (${inputCurrencyObj.name})`,
                outputCurrency: `${outputCurrencyObj.country} (${outputCurrencyObj.name})`,
                rate: +rate,
                startDate: startDate.toISOString().slice(0, 10),
                endDate: !endDate ? null : endDate.toISOString().slice(0, 10)
            })
                .then(res => {
                    
                    fetchExchangeRates();

                })
                .catch(error => {
                    console.log('error', error);
                });
            // setExchanges((prevState) => {
            //     return [...prevState, newExchange];
            // });
            handleCloseExchange();

            // }
        }
    }
    const handleTransactionCurrencyChange = (event) => {
        setTransactionCurrency(event.target.value);
    }

    const handleUserAccountChange = (event) => {
        setUserTransactionAccount(event.target.value)
    }

    const handleSelectedUserChange = (event) => {
        setSelectedUser(event.target.value)
    }

    const handleInputCurrencyChange = (event) => {
        setInputCurrency(event.target.value);


    };
    const handleOutputCurrencyChange = (event) => {
        setOutputCurrency(event.target.value);
    };
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    // Validation of Rate input
    const [error, setError] = useState('');
    const validateRate = (value) => {
        if (value === '') {
            setError('Rate cannot be empty.');
        } else if (!/^\d*\.?\d*$/.test(value)) {
            setError('Rate must be a number.');
        } else {
            setError('');
        }
    };


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ p: 1 }}>
                        Add a new currency
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className={styles.flex_column}>
                            <TextField onChange={handleNewCountryChange} className={styles.modal_input} id="outlined-basic" label="Country name" variant="outlined" />
                            <TextField sx={{ mt: 1 }} onChange={handleNewCurrencyNameChange} className={styles.modal_input} id="outlined-basic" label="Currency (ex. EUR, BAM)" variant="outlined" />
                            <Button onClick={onCreateCurrency} sx={{
                                bgcolor: '#ffaf36',
                                color: 'white',
                                p: 1, mt: 1,
                                "&:hover": {
                                    backgroundColor: '#ea8c00'
                                },
                            }} className={styles.modal_add_button}>Add</Button>
                        </div>
                        {isValid ? <div></div> : <div style={{ color: 'red' }}>Please fill out all fields.</div>}

                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openExchange}
                onClose={handleCloseExchange}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ p: 1 }}>
                        Add new exchange rate
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className={styles.flex_column}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">First currency</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={inputCurrency}
                                        label="First currency"
                                        onChange={handleInputCurrencyChange}
                                    >
                                        {currencies.map((currency) => (
                                            <MenuItem value={currency.id}>{currency.name}({currency.country})</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ minWidth: 120, marginTop: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Second currency</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={outputCurrency}
                                        label="Second currency"
                                        onChange={handleOutputCurrencyChange}
                                    >
                                        {currencies.map((currency) => (
                                            <MenuItem value={currency.id}>{currency.name}({currency.country})</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ minWidth: 120, marginTop: 2 }}>
                                <TextField className={styles.rate_input} id="outlined-basic" label="Rate" variant="outlined" onChange={(event) => {
                                    setRate(event.target.value);
                                    validateRate(event.target.value);
                                }}
                                    error={error !== ''}
                                    helperText={error} />
                            </Box>
                            <div>
                                <label>Start Date:</label>
                                <DatePicker selected={startDate} onChange={handleStartDateChange} />
                                <br />
                                <label>End Date:</label>
                                <DatePicker selected={endDate} onChange={handleEndDateChange} isClearable={true} placeholderText="Select end date" />
                            </div>
                            <Button onClick={onCreateExchange} sx={{
                                bgcolor: '#ffaf36',
                                color: 'white',
                                p: 1, mt: 1,
                                "&:hover": {
                                    backgroundColor: '#ea8c00'
                                },
                            }} className={styles.modal_add_button}>Add</Button>
                        </div>
                        {isValid ? <div></div> : <div style={{ color: 'red' }}>Please fill out all fields.</div>}

                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openExchangeTransaction}
                onClose={handleCloseExchangeTransaction}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ p: 1 }}>
                        Make new exchange transaction
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className={styles.flex_column}>
                            <Box sx={{ minWidth: 120, marginTop: 2 }}>
                                <TextField id="outlined-basic" label="Amount" variant="outlined" onChange={(event) => {
                                    setAmount(event.target.value);

                                }}
                                />
                            </Box>
                            <Box sx={{ minWidth: 120, marginTop: 2 }}>
                                <TextField id="outlined-basic" label="Transaction Purpose" variant="outlined" onChange={(event) => {
                                    setTransactionPurpose(event.target.value);
                                }}
                                />
                            </Box>
                            <Box sx={{ minWidth: 120, marginTop: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Account</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={userTransactionAccount}
                                        label="Your account"
                                        onChange={handleUserAccountChange}
                                    >
                                        {userAccounts.map((acc) => (
                                            <MenuItem value={acc}>{acc.currency} ({acc.bankName})</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ minWidth: 120, marginTop: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Account</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedUser}
                                        label="User"
                                        onChange={handleSelectedUserChange}
                                    >

                                        {userAccounts.map((acc) => (
                                            <MenuItem value={acc}>{acc.currency} ({acc.bankName})</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ minWidth: 120, marginTop: 2 }}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Converted Amount"
                                        variant="outlined"
                                        value={convertedAmount}
                                        disabled
                                    />
                                </Box>


                            <Button onClick={onCreateExchangeTransaction} sx={{
                                bgcolor: '#ffaf36',
                                color: 'white',
                                p: 1, mt: 1,
                                "&:hover": {
                                    backgroundColor: '#ea8c00'
                                },
                            }} className={styles.modal_add_button}>Add</Button>


                            {!exchangeUnavailable ? <div></div> : <div style={{ color: 'red' }}>Exchange rate not available.</div>}

                        </div>
                        {isValid ? <div></div> : <div style={{ color: 'red' }}>Please fill out all fields.</div>}

                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openRequests}
                onClose={handleCloseRequests}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ p: 1 }}>
                        All Transaction Requests
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className={styles.flex_column}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Purpose</th>
                                        <th>Category</th>
                                        <th>Currency</th>
                                        <th>User</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {transactions.map((transaction) => (
                                        <tr key={transaction.transactionId}>
                                            <td>{transaction.amount}</td>
                                            <td>{transaction.transactionType}</td>
                                            <td>{transaction.transactionPurpose}</td>
                                            <td>{transaction.category}</td>
                                            <td>{transaction.currency}</td>
                                            <td>{transaction.sender.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openCurrencyList}
                onClose={handleCloseCurrencyList}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ p: 1 }}>
                        All Currencies
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className={styles.flex_column}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Country</th>
                                        <th>Currency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currencies.map((currency) => (
                                        <tr key={currency.id}>
                                            <td>{currency.id}</td>
                                            <td>{currency.country}</td>
                                            <td>{currency.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </Typography>
                </Box>
            </Modal>
            <div className={styles.flex_row_between}>
                <div className={styles.flex_row}>
                    <Button onClick={handleOpen} className="p-3 m-5" sx={{
                        color: 'white',
                        bgcolor: '#ffaf36', "&:hover": {
                            backgroundColor: '#ea8c00'
                        }
                    }}>Add New Currency</Button>
                    <Button onClick={handleOpenCurrencyList} className="p-3 m-5" sx={{
                        color: 'black',
                        bgcolor: '#edeceb', "&:hover": {
                            backgroundColor: '#ea8c00'
                        },
                        borderWidth: 2,
                        borderColor: 'black'

                    }}>Show All Currencies</Button>

                </div>
                <div>
                    <Button onClick={handleOpenRequests} className="p-3 m-5" sx={{
                        color: 'white',
                        bgcolor: '#ffaf36', "&:hover": {
                            backgroundColor: '#ea8c00'
                        }
                    }}>Transaction Requests</Button>
                    <Button onClick={handleOpenExchange} className="p-3 m-5" sx={{
                        color: 'white',
                        bgcolor: '#ffaf36', "&:hover": {
                            backgroundColor: '#ea8c00'
                        }
                    }}>Add New Exchange Rate</Button>

                    <Button onClick={handleOpenExchangeTransaction} className="p-3 m-5" sx={{
                        color: 'white',
                        bgcolor: '#ffaf36', "&:hover": {
                            backgroundColor: '#ea8c00'
                        }
                    }}>New Exchange Transaction</Button>
                </div>
                {/* <div className={styles.flex_row}>
                    <h2 className="p-3 mt-5">Selected currency: {currentCurrency.country} - {currentCurrency.name}</h2>

                </div>
                */}
            </div>
            <div className={styles.flex_center}>
                <h1>List of all exchange rates</h1>
                <div style={{ height: 1000, width: 1602 }}>
                    <DataGrid
                        autoHeight
                        rows={exchanges}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>

            </div>
        </>
    )

}