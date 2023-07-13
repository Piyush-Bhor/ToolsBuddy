import './account.css';
import Details from './Details.js';
import AddListing from './AddListing.js';
import ViewListing from './ViewListing.js';
import Messages from './Messages.js';
import avatar from '../../assets/avatar-icon.png';
import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
function Account() {
    
    /*const { user } = useAuth0();

    if (!user) {
      return null;
    }*/

    const [page, setPage] = useState("details");
    
    function handleClick(page){
        setPage(page);
    }

    return (
        
        <div className="account">
            <div className="account-container">
                <aside>
                    <div className="profile">
                        <img
                        src={avatar}
                        alt="Profile"
                        className="avatar"
                        />
                        <h2>John Smith</h2>
                    </div>
                    {/* <div className="profile">
                        <img
                        src={user.picture}
                        alt="Profile"
                        className="avatar"
                        />
                        <h2>{user.name}</h2>
                    </div> */}
                    
                    <button onClick={() => handleClick("details")}>Edit Details</button>
                    <button onClick={() => handleClick("current")}>Current Listings</button>
                    <button onClick={() => handleClick("new")}>New Listing</button>
                    <button onClick={() => handleClick("messages")}>Messages</button>
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