import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import styles from '../VoucherRedemption/VoucherRedemption.module.css'
import { useState, useEffect } from 'react';
import { getAccounts, redeemVoucher } from '../../services/currencyService';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function VoucherRedemption() {

    const [voucher, setVoucher] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState({});
    const handleVoucherInput = (event) => {
        setIsValid(null);
        setVoucher(event.target.value);
    }
    const onRedeemVoucher = () => {
         // Pozvati rutu iz backenda za provjeru je li validan voucher
        //console.log("account: ", selectedAccount.accountNumber);
        console.log("vaucer: ", voucher);
        redeemVoucher({AccountNumber:selectedAccount.accountNumber, Code:voucher}) 
        .then(res => {
            console.log("nestooooo",res);
        })
        .catch(error => {
            console.log('error', error);
        });
        //Promijeniti ovo ispod kada se doda backend
        if(voucher == 'validan'){
            setIsValid(true);
        }
        else{
            setIsValid(false);
        }
    }

    const handleAccountSelected = (event) => {
        setSelectedAccount(event.target.value);

        console.log(selectedAccount)
    }

    useEffect(() => {
        fetchUserAccounts();
    }, []);

    const fetchUserAccounts = async () =>{
        getAccounts().then(res => {
            setAccounts(res.data);
        })
    }
    
    return (
        <div className={styles.voucher_container}>
            <div className={styles.flex_column}>
                {isValid == true && <h1 className={styles.valid_voucher}>Voucher redeemed successfully!</h1>}
                {isValid == false && <h1 className={styles.invalid_voucher}>Voucher is not valid!</h1>}
                <Box sx={{ minWidth: 120 }} className={styles.box}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select account</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedAccount}
                                        label="Select Account"
                                        onChange={handleAccountSelected}
                                    >
                                        {accounts.map((account) => (
                                            <MenuItem value={account}>{account.accountNumber} ({account.currency} {account.bankName})</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Box>
                <TextField sx={{width: '40rem'}}  onChange={handleVoucherInput}  id="outlined-basic" label="Enter your voucher" variant="outlined" />
                <Button onClick={onRedeemVoucher} sx={{
                                bgcolor: '#ffaf36',
                                color: 'white',
                                p: 1, mt: 1,
                                "&:hover": {
                                    backgroundColor: '#ea8c00'
                                },
                            }} >Redeem</Button>
            </div>
        </div>
    );
}