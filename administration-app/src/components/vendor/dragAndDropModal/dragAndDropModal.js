import React, { useEffect, useState } from 'react';

import {
	FormControl,
	Select,
	MenuItem,
	Input,
	Button,
	TextField,
	Grid,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	InputLabel,
	Chip,
	Checkbox,
	ListItemText,
} from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';

import { createVendor } from '../../../services/vendorService';
import { getAllUsers, getUserByName, getUserId } from '../../../services/userService';
import Loader from '../../loaderDialog/Loader';

function dragAndDropModal(props) {
    return (
		
					<CardHeader align='left' title={'Create B2B Customer'}></CardHeader>
    );
}
export default dragAndDropModal

