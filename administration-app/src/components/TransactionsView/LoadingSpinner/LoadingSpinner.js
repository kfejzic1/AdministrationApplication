import Box  from '@mui/material/Box';

const LoadingSpinner = props => {	
	return (
	<Box 
		sx={
			props.asOverlay
			? {
				height: '100%',
				width: '100%',
				position: 'absolute',
				top: 0,
				left: 0,
				backgroundColor: 'rgba(255, 255, 255, 0.9)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				}
			: {}
		}>
		<Box 
			as="div"
			sx={{
				display: 'inline-block',
				width: '64px',
				height: '64px',

				'&::after': {
					content: "''",
					display: 'block',
					width: '46px',
					height: '46px',
					margin: '1px',
					borderRadius: '50%',
					border: '5px solid #510077',
					borderColor: '#510077 transparent #510077 transparent',
					animation: 'lds-dual-ring 1.2s linear infinite',
				},

				'@keyframes lds-dual-ring': {
					'0%': {
					  transform: 'rotate(0deg)',
					},
					'100%': {
					  transform: 'rotate(360deg)',
					},
				},
		}}></Box>
	</Box>


	);
};

export default LoadingSpinner;


