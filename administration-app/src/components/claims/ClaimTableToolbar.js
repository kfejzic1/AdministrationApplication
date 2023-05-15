import React, { useState } from 'react';
import { Toolbar, Tooltip, Typography, Button, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loader from '../loaderDialog/Loader';

const useStyles = makeStyles(theme => ({
	button: {
		marginRight: '20px',
		'&.MuiButton-contained': {
			backgroundImage: 'linear-gradient(144deg, #ffb649 35%,#ffee00)',
			borderRadius: '10px',
			color: 'black',
			width: '15rem',
			height: '30px',
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
		'&.MuiButton-outlined': {
			color: '#ffb649',
			height: '30px',
			width: '15rem',
			border: '2px solid #ffb649',
			'&:hover': {
				border: '2px solid #000000',
				color: '#000000',
			},
		},
	},
}));

const tableTheme = createTheme({
	palette: {
		primary: {
			main: '#E7EBF0',
		},
		secondary: {
			main: '#ff9a001f',
		},
		secondary2: {
			main: '#ffaf36',
		},
	},
});

export default function ClaimTableToolbar(props) {
	const [loaderState, setLoaderState] = useState({ success: false, loading: true });
	const [openLoader, setOpenLoader] = useState(false);
	const classes = useStyles();
	const { numSelected } = props;
	return (
		<ThemeProvider theme={tableTheme}>
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
					...(numSelected > 0 && {
						bgcolor: theme => alpha(theme.palette.secondary.main, theme.palette.action.activatedOpacity),
					}),
				}}
			>
				{numSelected > 0 ? (
					<Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
						{numSelected} selected
					</Typography>
				) : (
					<Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
						My Claims
					</Typography>
				)}
			</Toolbar>
			<Loader open={openLoader} loaderState={loaderState} />
		</ThemeProvider>
	);
}

