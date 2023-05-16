import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import { getAllVendors } from '../../../services/vendorService';
import { approve, getRequests, specifyData } from '../../../services/Einovice/requiredDataServices';
const EinoviceApprove = props => {
	const [data1, setData] = useState(['']);
	const [refresh, setRefresh] = useState(false);
	const [requsets, setRequsets] = useState([]);
	const [id, setId] = useState('');
	useEffect(() => {
		getRequests().then(arg => {
			setRequsets(
				arg.data.map(v => {
					if(v.status == 1)
					return (
						<TableRow>
							<TableCell width={'33%'} align='center'>
								{v.user.userName}
							</TableCell>
							<TableCell width={'33%'} align='center'>
								{v.vendor.name}
							</TableCell>
							<TableCell width={'17%'} align='center'>
								<Button
									onClick={() => {
										approve(v.eInvoiceRequestId, 'true');
									}}
								>
									Approve
								</Button>
							</TableCell>
							<TableCell width={'17%'} align='center'>
								<Button
									onClick={() => {
										approve(v.eInvoiceRequestId, 'false');
									}}
								>
									Reject
								</Button>
							</TableCell>
						</TableRow>
					); else return null;
				})
			);
		});
	}, []);
	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell width={'33%'} align='center'>
							User
						</TableCell>
						<TableCell width={'33%'} align='center'>
							Vendor
						</TableCell>
						<TableCell width={'17%'} align='center'></TableCell>
						<TableCell width={'17%'} align='center'></TableCell>
					</TableRow>
				</TableHead>
				{requsets}
			</Table>
		</Box>
	);
};

export default EinoviceApprove;
