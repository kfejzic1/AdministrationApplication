import { Link } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
	return (
		<div>
			<nav className='nav-bar'>
				<div className='nav-logo'>Vendor Management</div>
				<ul className='nav-links'>
					<li>
						<Link to='/B2BPanel' className='active'>
							B2B Customers
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
