import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Transaction from './Transaction';
export default function Group(arg) {
	const [open, setOpen] = React.useState(false);
	return (
		<React.Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell align='left' colSpan={5}>
					<Typography variant='subtitle2'>Currency: {arg.data.keyValue}</Typography>
				</TableCell>
				<TableCell align='right' sx={{ border: 0 }}>
					<Typography variant='subtitle2'>Amount: {arg.data.totalAmount}</Typography>
					<Typography variant='subtitle2'> Count: {arg.data.numberOfTransactions}</Typography>
				</TableCell>
				<TableCell align='center'>
					<IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Table size='small' aria-label='purchases'>
							<TableBody>
								{arg.data.transactions.map((item, index) => (
									<Transaction
										variant='group'
										key={item.id}
										setDetails={arg.setDetails}
										index={index}
										prop={item}
									></Transaction>
								))}
							</TableBody>
						</Table>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}
