import { Button } from "@mui/material";
import { useState } from "react";
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

export default function Currencies() {

    const dummyCurrencies = [
        {
            id: '1',
            country: 'USA',
            name: 'Dollar',
            exchangeRates: [
                {
                    id: '1',
                    inputCurrencyId: '1',
                    outputCurrencyId: '2',
                    rate: '15',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '2',
                    inputCurrencyId: '1',
                    outputCurrencyId: '3',
                    rate: '14.5',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '3',
                    inputCurrencyId: '1',
                    outputCurrencyId: '4',
                    rate: '14',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '4',
                    inputCurrencyId: '1',
                    outputCurrencyId: '5',
                    rate: '13.5',
                    startDate: new Date(),
                    endDate: new Date()
                },

            ]
        },
        {
            id: '2',
            country: 'BiH',
            name: 'BAM',
            exchangeRates: [
                {
                    id: '5',
                    inputCurrencyId: '2',
                    outputCurrencyId: '1',
                    rate: '13',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '6',
                    inputCurrencyId: '2',
                    outputCurrencyId: '3',
                    rate: '12.5',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '7',
                    inputCurrencyId: '2',
                    outputCurrencyId: '4',
                    rate: '12',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '8',
                    inputCurrencyId: '2',
                    outputCurrencyId: '5',
                    rate: '11.5',
                    startDate: new Date(),
                    endDate: new Date()
                },

            ]
        },
        {
            id: '3',
            country: 'UK',
            name: 'GBP',
            exchangeRates: [
                {
                    id: '8',
                    inputCurrencyId: '3',
                    outputCurrencyId: '1',
                    rate: '11',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '10',
                    inputCurrencyId: '3',
                    outputCurrencyId: '2',
                    rate: '10.5',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '11',
                    inputCurrencyId: '3',
                    outputCurrencyId: '4',
                    rate: '10',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '12',
                    inputCurrencyId: '3',
                    outputCurrencyId: '5',
                    rate: '9.5',
                    startDate: new Date(),
                    endDate: new Date()
                },

            ]
        },
        {
            id: '4',
            country: 'China',
            name: 'YEN',
            exchangeRates: [
                {
                    id: '13',
                    inputCurrencyId: '4',
                    outputCurrencyId: '1',
                    rate: '9',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '14',
                    inputCurrencyId: '4',
                    outputCurrencyId: '2',
                    rate: '8.5',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '15',
                    inputCurrencyId: '4',
                    outputCurrencyId: '3',
                    rate: '8',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '16',
                    inputCurrencyId: '4',
                    outputCurrencyId: '5',
                    rate: '7.5',
                    startDate: new Date(),
                    endDate: new Date()
                },

            ]
        },
        {
            id: '5',
            country: 'EU',
            name: 'EUR',
            exchangeRates: [
                {
                    id: '17',
                    inputCurrencyId: '5',
                    outputCurrencyId: '1',
                    rate: '7',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '18',
                    inputCurrencyId: '5',
                    outputCurrencyId: '2',
                    rate: '6.5',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '19',
                    inputCurrencyId: '5',
                    outputCurrencyId: '3',
                    rate: '6',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '20',
                    inputCurrencyId: '5',
                    outputCurrencyId: '4',
                    rate: '5.5',
                    startDate: new Date(),
                    endDate: new Date()
                },

            ]
        },
        {
            id: '6',
            country: 'Australia',
            name: 'AUD',
            exchangeRates: [
                {
                    id: '1',
                    inputCurrencyId: '1',
                    outputCurrencyId: '2',
                    rate: '5',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '2',
                    inputCurrencyId: '1',
                    outputCurrencyId: '3',
                    rate: '4.5',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '3',
                    inputCurrencyId: '1',
                    outputCurrencyId: '4',
                    rate: '4',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '4',
                    inputCurrencyId: '1',
                    outputCurrencyId: '5',
                    rate: '3.5',
                    startDate: new Date(),
                    endDate: new Date()
                },

            ]
        }, {
            id: '7',
            country: 'Switzerland',
            name: 'CHF',
            exchangeRates: [
                {
                    id: '1',
                    inputCurrencyId: '1',
                    outputCurrencyId: '2',
                    rate: '3',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '2',
                    inputCurrencyId: '1',
                    outputCurrencyId: '3',
                    rate: '2.5',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '3',
                    inputCurrencyId: '1',
                    outputCurrencyId: '4',
                    rate: '2',
                    startDate: new Date(),
                    endDate: new Date()
                },
                {
                    id: '4',
                    inputCurrencyId: '1',
                    outputCurrencyId: '5',
                    rate: '1.5',
                    startDate: new Date(),
                    endDate: new Date()
                },

            ]
        }

    ]

    var defaultCurrency = {
        id: '1',
        country: 'USA',
        name: 'Dollar',
        exchangeRates: [
            {
                id: '1',
                inputCurrencyId: '1',
                outputCurrencyId: '2',
                rate: '3',
                startDate: new Date("2022-03-25"),
                endDate: new Date("2022-06-25")
            },
            {
                id: '2',
                inputCurrencyId: '1',
                outputCurrencyId: '3',
                rate: '2.5',
                startDate: new Date("2012-03-25"),
                endDate: new Date("2012-06-25")
            },
            {
                id: '3',
                inputCurrencyId: '1',
                outputCurrencyId: '4',
                rate: '2',
                startDate: new Date("2002-03-25"),
                endDate: new Date("2002-06-25")
            },
            {
                id: '4',
                inputCurrencyId: '1',
                outputCurrencyId: '5',
                rate: '1.5',
                startDate: new Date("1990-03-25"),
                endDate: new Date("1990-06-25")
            },

        ]
    }
    function getStartDate(params) {
        console.log('params ', params)
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
        { field: 'country', headerName: 'Country', width: 300, headerAlign: 'center', align: 'center' },
        { field: 'name', headerName: 'Currency', width: 300, headerAlign: 'center', align: 'center' },
        { field: 'rate', headerName: 'Rate', width: 300, headerAlign: 'center', align: 'center' },
        {
            field: 'startDate', headerName: 'Start Date', width: 300, headerAlign: 'center', align: 'center',
            valueGetter: getStartDate
        },
        { field: 'exchangeRates.endDate', headerName: 'End Date', width: 300, headerAlign: 'center', align: 'center' }
    ]

    const [currencies, setCurrencies] = useState(dummyCurrencies);
    const [exchanges, setExchanges] = useState(defaultCurrency.exchangeRates)
    const [open, setOpen] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [currentCurrency, setCurrentCurrency] = useState(defaultCurrency)
    const [inputCurrency, setInputCurrency] = useState({
        id: '0',
        country: '',
        name: ''
    });
    const [outputCurrency, setOutputCurrency] = useState({
        id: '0',
        country: '',
        name: ''
    });
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
    const handleOpenExchange = () => setOpenExchange(true);
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
            setCurrencies((prevState) => {
                return [...prevState, newCurrency];
            });
            handleClose();

        }
        else {
            setIsValid(false);
        }
    }
    const onCreateExchange = () => {
        newExchange.id = '14'
        // if (newC.country.trim() != '' && newCurrency.name.trim() != '') {
        //     setCurrencies((prevState) => {
        //         return [...prevState, newCurrency];
        //     });
        //     handleClose();

        // }
        // else {
        //     setIsValid(false);
        // }
        setExchanges((prevState) => {
            return [...prevState, newExchange]
        })
    }
    const handleChange = (event) => {
        setInputCurrency(event.target.value);
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
                                        onChange={handleChange}
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
                                        value={inputCurrency}
                                        label="First currency"
                                        onChange={handleChange}
                                    >
                                        {currencies.map((currency) => (
                                            <MenuItem value={currency.id}>{currency.name}({currency.country})</MenuItem>
                                        ))}
                                        
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button sx={{
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
            <div className={styles.flex_row_between}>
                <div className={styles.flex_row}>
                    <Button onClick={handleOpen} className="p-3 m-5" sx={{
                        color: 'white',
                        bgcolor: '#ffaf36', "&:hover": {
                            backgroundColor: '#ea8c00'
                        }
                    }}>Add New Currency</Button>
                    <Button onClick={handleOpenExchange} className="p-3 m-5" sx={{
                        color: 'white',
                        bgcolor: '#ffaf36', "&:hover": {
                            backgroundColor: '#ea8c00'
                        }
                    }}>Add New Exhange Rate</Button>
                </div>
                <div className={styles.flex_row}>
                    <h2 className="p-3 mt-5">Selected currency: {currentCurrency.country} - {currentCurrency.name}</h2>

                </div>
            </div>
            <div className={styles.flex_center}>
                <h1>List of all available currencies</h1>
                <div style={{ height: 1000, width: 1602 }}>
                    <DataGrid
                        autoHeight
                        rows={currencies}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>

            </div>
        </>
    )

}