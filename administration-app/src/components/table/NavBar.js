import { Link } from 'react-router-dom';
import './B2BTable/css/NavBar.css';

export const NavBar = () => {
	return (
		<div>
			<nav className='nav-bar'>
				<div className='nav-logo'>Vendor Management</div>
				<ul className='nav-links'>
					<li>
						<Link to='/B2BTable' className='active'>
							Customers
						</Link>
					</li>
					<li>
						<Link to='/vendor' className='active'>
							Create User
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
