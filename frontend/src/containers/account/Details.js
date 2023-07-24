import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Details() {
    const { user } = useAuth0();
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.name);

    function handleChange(){
        
    }

    if (!user) {
        return null;
    }

    return (
        
        <div className="details">
            <h1>Edit Details</h1>
            <section className="details-container">
                
                <form className="account-form">
                    
                    <section className="inputs">
                        <label for="username">Username</label>
                        <input id="username" value={username} onChange={handleChange} />
                    
                        <label for="password">Email</label>
                        <input id="password" value={email} onChange={handleChange} />
                    
                        <label for="password">Password</label>
                        <input id="password" />
                        <button type="submit">Save Changes</button>
                    </section>
                    
                </form>
            </section>
        </div>
    );
}

export default Details;