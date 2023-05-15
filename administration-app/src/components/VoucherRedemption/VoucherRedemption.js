import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import styles from '../VoucherRedemption/VoucherRedemption.module.css'
import { useState} from 'react';
import { getAccounts, redeemVoucher } from '../../services/currencyService';

export default function VoucherRedemption() {

    const [voucher, setVoucher] = useState('');
    const [isValid, setIsValid] = useState(null);

    const handleVoucherInput = (event) => {
        setIsValid(null);
        setVoucher(event.target.value);
    }
    const onRedeemVoucher = () => {
        redeemVoucher({Code:voucher}) 
        .then(res => {
            setIsValid(true);
        })
        .catch(error => {
            setIsValid(false);
        });
    }
    
    return (
        <div className={styles.voucher_container}>
            <div className={styles.flex_column}>
            <div className={styles.box}>
                {isValid == true && <h1 className={styles.valid_voucher}>Voucher redeemed successfully!</h1>}
                {isValid == false && <h1 className={styles.invalid_voucher}>Voucher is not valid!</h1>}
                <TextField sx={{width: '40rem', marginBottom:'16px'}}  onChange={handleVoucherInput}  id="outlined-basic" label="Enter your voucher" variant="outlined" className={styles.input}/>
                <Button onClick={onRedeemVoucher} sx={{
                                bgcolor: '#ffaf36',
                                color: 'white',
                                p: 1, mt: 1,
                                "&:hover": {
                                    backgroundColor: '#ea8c00'
                                },
                                width: '100%'
                            }} >Redeem</Button>
                    </div>
                            </div>
            </div>
    );
}