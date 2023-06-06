import './navbar.css';
import Logo from '../../assets/logo-placeholder.png'
import { NavLink } from 'react-router-dom'
function Navbar() {
  return (
    <div className="navbar">
        
        <ul className="pages">
            <li>
                <img id="logo" alt="logo" src={Logo}></img>
            </li>
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
                <NavLink to="/signup"><button>Sign Up</button></NavLink>
            </li>
        </ul>
        
        
    </div>
  );
}

export default Navbar;
