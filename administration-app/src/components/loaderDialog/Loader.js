import { Dialog, DialogTitle, CircularProgress, makeStyles, DialogContent } from '@material-ui/core';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const useStyles = makeStyles({
	root: {
		justifyContent: 'center',
		display: 'flex',
		paddingTop: '2em',
		paddingBottom: '2em',
		paddingLeft: '4em',
		paddingRight: '4em',
	},
});

function Loader(props) {
	const classes = useStyles();
	const { open, loaderState } = props;

	return (
		<Dialog aria-labelledby='simple-dialog-title' open={open}>
			<DialogTitle id='simple-dialog-title'>
				{/* {(loaderState.loading ? <HourglassTopIcon /> : loaderState.success ? <CheckIcon /> : <ErrorOutlineIcon />) + */}
				Procesing request
			</DialogTitle>
			<DialogContent className={classes.root}>
				<CircularProgress color='secondary' />
			</DialogContent>
		</Dialog>
	);
}
export default Loader;
