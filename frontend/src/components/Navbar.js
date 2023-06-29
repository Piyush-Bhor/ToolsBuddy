import './components.css';
import Logo from '../assets/logo-placeholder.png'
import { NavLink } from 'react-router-dom'
import { BiMenu } from "react-icons/bi";
import React, { useState} from "react";
function Navbar() {
    const [showNav, setShowNav] = useState(false);
    function handleMenu(){
        setShowNav((showNav)=>!showNav);
    }

    return (
        <div className="navbar">
            <div className="large-navbar">
                <img id="logo" alt="logo" src={Logo}></img>
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
                        <NavLink to="/signup"><button>Sign Up</button></NavLink>
                    </li>
                </ul>
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
