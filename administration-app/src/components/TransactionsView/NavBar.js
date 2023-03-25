import { Link } from 'react-router-dom';
import './css/NavBar.css';

export const NavBar = () => {
	return (
		<div>
			<nav className='nav-bar'>
				<div className='nav-logo'>Payment App</div>
				<ul className='nav-links'>
					<li>
						<Link to='/' className='active'>
							Home
						</Link>
					</li>
					<li>
						<Link to='/transactions' className='active'>
							Transactions
						</Link>
					</li>
					<li>
						<Link to='/account' className='active'>
							Account
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
