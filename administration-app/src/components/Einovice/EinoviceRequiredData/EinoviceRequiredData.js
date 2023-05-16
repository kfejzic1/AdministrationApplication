import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Typography } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import { getAllVendors } from '../../../services/vendorService';
import { specifyData } from '../../../services/Einovice/requiredDataServices';
const EinoviceRequiredData = props => {
	const [data1, setData] = useState(['']);
	const [refresh, setRefresh] = useState(false);
	const [vendors, setVendors] = useState([]);
	const [id, setId] = useState('');
	useEffect(() => {
		getAllVendors().then(arg => {
			setVendors(
				arg.data.map(v => {
					return <MenuItem value={v.id}>{v.name}</MenuItem>;
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
			<Typography variant={'h3'} style={{ selfAlign: 'center', textAlign: 'center', margin: 50 }}>
				Define e-inovice atributs for company
			</Typography>
			<FormControl style={{ width: 274, alignSelf: 'center', margin: 24 }}>
				<Select
					labelId='filter-status-label'
					id='filter-status'
					displayEmpty
					onChange={e => {
						setId(e.target.value);
					}}
				>
					{vendors}
				</Select>
			</FormControl>
			{data1.map((item, index) => {
				return (
					<Box
						key={index}
						style={{ marginBottom: 23, flexDirection: 'row', display: 'flex', justifyContent: 'center' }}
					>
						<Box>
							<TextField
								onChange={e => {
									var temp = data1;
									temp[index] = e.target.value;
									setData(temp);
									setRefresh(!refresh);
								}}
								value={data1[index]}
							></TextField>
						</Box>
						<div style={{ display: 'flex' }}>
							<Button
								onClick={() => {
									var temp = data1;
									temp.splice(index, 1);
									setData(temp);
									setRefresh(!refresh);
								}}
							>
								<DeleteSweepIcon></DeleteSweepIcon>
							</Button>
						</div>
					</Box>
				);
			})}

			{data1.length < 4 ? (
				<Box style={{ display: 'flex', justifyContent: 'center', marginRight: 24 }}>
					<Button
						style={{ display: 'flex' }}
						onClick={() => {
							var temp = data1;
							temp.push('');
							setData(temp);
							setRefresh(!refresh);
						}}
					>
						<AddCircleOutlineIcon></AddCircleOutlineIcon>
					</Button>
				</Box>
			) : null}
			{data1.length > 0 ? (
				<Box style={{ display: 'flex', justifyContent: 'center', marginRight: 24, marginTop: 24 }}>
					<Button
						variant='contained'
						style={{ display: 'flex' }}
						onClick={() => {
							var k = data1.map((item, index) => {
								return '"param' + (index + 1) + '":"' + item + '",';
							});
							var t = '';
							for (var i = 0; i < k.length; i++) {
								t += k[i];
							}
							t = t.slice(0, t.length - 1);
							t = '{' + t + '}';
							specifyData(id, JSON.parse(t))
								.then(s => {
									alert('Successfull');
								})
								.catch(s => {
									alert('Failed');
								});
						}}
					>
						Define
					</Button>
				</Box>
			) : null}
		</Box>
	);
};

export default EinoviceRequiredData;
