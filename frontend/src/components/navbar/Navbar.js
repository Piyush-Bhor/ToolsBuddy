import './navbar.css';
import { NavLink } from 'react-router-dom'
function Navbar() {
  return (
    <div className="navbar">
        
        <ul className="pages">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
            </li>
        </ul>
        <ul className="login">
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
            <li>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
        </ul>
        
        
    </div>
  );
}

export default Navbar;
