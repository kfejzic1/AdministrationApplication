import { Link } from 'react-router-dom';
import './NavBar.css';
import MainHeader from '../vendorManagmentComponent/vmc';

export default function NavBar() {
	return (
		<div>
			<nav className='nav-bar'>
				<MainHeader />
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
}
