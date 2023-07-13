import './components.css';
import Logo from '../assets/logo-placeholder.png'
import { NavLink } from 'react-router-dom'
import { BiMenu } from "react-icons/bi";
import React, { useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
    const { isAuthenticated } = useAuth0();
    const [showNav, setShowNav] = useState(false);
    
    function handleMenu(){
        setShowNav((showNav)=>!showNav);
    }

    return (
        <div className="navbar">
            <div className="large-navbar">
                <img id="logo" alt="logo" src={Logo}></img>
                <ul className="pages">
                    
                    <li className="link">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="link">
                        <NavLink to="/search">Search</NavLink>
                    </li>
                </ul>
                {!isAuthenticated &&
                <ul className="login">
                    <li className="link">
                        <NavLink to="http://localhost:8080/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="http://localhost:8080/login"><button>Sign Up</button></NavLink>
                    </li>
                </ul>
                }
                {isAuthenticated &&
                <ul className="login">
                    <li className="link">
                        <NavLink to="/account">Account</NavLink>
                    </li>
                </ul>
                }

                <BiMenu id="menu" onClick={handleMenu} />
            </div>
            {showNav &&
            <div className="resize-navbar">
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">Search</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup"><button>Sign Up</button></NavLink>
                    </li>
                </ul>
            </div>}
        </div>
    );
}

export default Navbar;
