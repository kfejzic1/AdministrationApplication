import { Button, TableCell, TableRow } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import ClaimForm from '../TransactionClaim/ClaimForm';
import { parseDate } from './../../../services/TransactionsView/transactionsService';
export default function Transaction(arg) {
	const [openClaimForm, setOpenClaimForm] = useState(false);
	const handleOpenClaimForm = () => setOpenClaimForm(true);
	const handleCloseForm = () => setOpenClaimForm(false);
	if (arg.variant && arg.variant == 'group')
		return (
			<>
			<Modal
			open={openClaimForm}
			onClose={handleCloseForm}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
	>
<ClaimForm id={arg.prop.transactionId} onClose={handleCloseForm}></ClaimForm>
	</Modal>
			<TableRow sx={{ bgcolor: '#fff' }}>
				<TableCell sx={{ width: '11%' }}></TableCell>
				<TableCell sx={{ width: '20%' }} align='center'>
					{parseDate(arg.prop.createdAt)}
				</TableCell>
				<TableCell sx={{ width: '20%' }} align='center'>
					{arg.prop.recipient.name ? arg.prop.recipient.name : arg.prop.recipient.phoneNumber}
				</TableCell>
				<TableCell sx={{ width: '20%' }} align='center'>
					{arg.prop.amount}
				</TableCell>
				<TableCell sx={{ width: '10%' }} align='center'>
					{arg.prop.currency}
				</TableCell>
				<TableCell sx={{ width: '13%' }} align='center'>
					{arg.prop.transactionType}
				</TableCell>
				<TableCell sx={{ width: '7%' }} align='center'>
					<Button
						onClick={() => {
							arg.setDetails(arg.prop);
						}}>
						Details
					</Button>
				</TableCell>
				<TableCell align='center'>
					<Button
					onClick={handleOpenClaimForm}>
					 Claim
					 </Button>
					 </TableCell>
			</TableRow>
			</>
		);
	else
		return (
			<>
			<Modal
                open={openClaimForm}
                onClose={handleCloseForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
				<ClaimForm id={arg.prop.transactionId} onClose={handleCloseForm}></ClaimForm>
            </Modal>
			<TableRow sx={{ bgcolor: '#fff' }}>
				<TableCell></TableCell>
				<TableCell align='center'>{parseDate(arg.prop.createdAt)}</TableCell>
				<TableCell align='center'>
					{arg.prop.recipient.name ? arg.prop.recipient.name : arg.prop.recipient.phoneNumber}
				</TableCell>
				<TableCell align='center'>{arg.prop.amount}</TableCell>
				<TableCell align='center'>{arg.prop.currency}</TableCell>
				<TableCell align='center'>{arg.prop.transactionType}</TableCell>
				<TableCell align='center'>
					<Button
						onClick={() => {
							arg.setDetails(arg.prop);
						}}>
						Details
					</Button>
				</TableCell>
				<TableCell align='center'>
					<Button
					onClick={handleOpenClaimForm}>
					 Claim
					 </Button>
					 </TableCell>
					 
			</TableRow>
			</>		
		);
}
