import './account.css';
import Details from './Details.js';
import AddListing from './AddListing.js';
import ViewListing from './ViewListing.js';
import Messages from './Messages.js';
import avatar from '../../assets/avatar-icon.png';
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaEdit, FaClipboardList } from "react-icons/fa";
import { AiFillFileAdd, AiFillMessage } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import Logout from "../../components/Logout.js"



function Account() {
    const { user } = useAuth0();
    /* console.log(user)  */

    const [page, setPage] = useState("current");
    
    function handleClick(page){
        setPage(page);
    }

    if (!user) {
      return <p style={{textAlign: "center"}}>You must log in to view this page.</p>;
    }

    return (
        
        <div className="account">
            <div className="account-container">
                <aside className="profile">
                    <div className="profile-header">
                        <img
                        src={user.picture}
                        alt="Profile"
                        className="avatar"
                        />
                        <div className="account-text">
                            <p>My Account</p>
                            <p className="display-name">{user.nickname}</p>
                        </div>
                    </div>
                        
                    <div className="profile-links">
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
                    <hr/>
                    <div className="account-logout">
                        <BiLogOut id="logout-icon" />
                        <Logout  />
                    </div>
                        
                    {/* </button> */}

                </aside>
                <section className="account-details">
                    {page === "current" && <ViewListing />}
                    {page === "new" && <AddListing />}
                    {page === "messages" && <Messages />}
                </section>
            </div>
        </div>
    );
}

export default Account;