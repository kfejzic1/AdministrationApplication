import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <div>
      <nav className="nav-bar">
        <div className="nav-logo">Payment App</div>
        <ul className="nav-links">
          <li>
            <Link to="/" activeClassName="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/transactions" activeClassName="active">
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/account" activeClassName="active">
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
