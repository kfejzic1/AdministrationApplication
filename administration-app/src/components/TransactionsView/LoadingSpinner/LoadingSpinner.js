import cn from './LoadingSpinner.module.css';

const LoadingSpinner = props => {
	return (
		<div className={props.asOverlay && cn.loading_spinner__overlay}>
			<div className={cn.lds_dual_ring}></div>
		</div>
	);
};

export default LoadingSpinner;
