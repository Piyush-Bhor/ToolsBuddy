import './account.css';
import Details from './Details.js';
import AddListing from './AddListing.js';
import ViewListing from './ViewListing.js';
import Messages from './Messages.js';
import avatar from '../../assets/avatar-icon.png';
import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { FaEdit, FaClipboardList } from "react-icons/fa";
import { AiFillFileAdd, AiFillMessage } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
function Account() {
    
    const { user } = useAuth0();

    /*if (!user) {
      return null;
    }*/

    console.log(user)

    const [page, setPage] = useState("details");
    
    function handleClick(page){
        setPage(page);
    }


    return (
        
        <div className="account">
            <div className="account-container">
                <aside className="profile">
                    <div className="profile-header">
                        <img
                        src={avatar}
                        alt="Profile"
                        className="avatar"
                        />
                        <div>
                        <p>My Account</p>
                        <h3>John Smith</h3>
                        </div>
                        
                    </div>
                        
                    
                    {/* <div className="profile">
                        <img
                        src={user.picture}
                        alt="Profile"
                        className="avatar"
                        />
                        <h2>{user.name}</h2>
                    </div> */}
                    <div className="profile-links">

                        <button onClick={() => handleClick("details")}>
                            <FaEdit className="profile-icon" alt="edit icon" /> Edit Details
                        </button>
                        <button onClick={() => handleClick("current")}>
                            <FaClipboardList className="profile-icon" alt="list icon" / >Current Listings
                        </button>
                        <button onClick={() => handleClick("new")}>
                            <AiFillFileAdd className="profile-icon" alt="add icon" /> New Listing
                        </button>
                        <button onClick={() => handleClick("messages")}>
                            <AiFillMessage className="profile-icon" alt="chat bubble icon" /> Messages
                        </button>
                    </div>

                    <a href="" className="logout">
                        <BiLogOut id="logout-icon" alt="chat bubble icon" />
                        Log Out
                    </a>
                </aside>
                <section className="account-details">
                    {page == "details" && <Details/>}
                    {page == "current" && <ViewListing />}
                    {page == "new" && <AddListing />}
                    {page == "messages" && <Messages />}
                </section>
            </div>
        </div>
    );
}

export default Account;