/* import './navbar.css'; */
import './navbar.css';
import Login from "./Login.js"
import Logout from "./Logout.js"
import Logo from '../assets/logo-placeholder.png'
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'react-router-dom'
import { BiLibrary, BiMenu } from "react-icons/bi";
import React, { useState} from "react";


function Navbar() {
    const { isAuthenticated } = useAuth0();
    const [showNav, setShowNav] = useState(false);
    const { user } = useAuth0();
    
    console.log(isAuthenticated);
    
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
                        <Login />
                    </li>
                </ul>
                }
                {isAuthenticated &&
                <ul className="login">
                    <li>
                        <NavLink to="/account">Hi, {user.name}</NavLink>
                        <ul className="dropdown">
                            <li><NavLink to="/account">Account</NavLink></li>
                            <li><Logout /></li>
                        </ul>
                    </li>
                </ul>
                }

                <BiMenu id="menu" onClick={handleMenu} />
            </div>

            {showNav &&
            <div className="resize-navbar">
                <ul className="pages">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">Search</NavLink>
                    </li>
                </ul>
                {!isAuthenticated &&
                <ul className="login">
                    <li >
                        <Login />
                    </li>
                    {/* <li>
                        <button className="signup" onClick={() => loginWithRedirect()}>Sign Up</button>
                    </li> */}
                </ul>
                }
                {isAuthenticated &&
                <ul className="login">
                    <li>
                        <NavLink to="/account">Account</NavLink>
                        
                    </li>
                    <li>
                        <Logout />
                    </li>
                </ul>
                }
            </div>}
        </div>
    );
}

export default Navbar;
