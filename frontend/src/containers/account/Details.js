
import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
function Details() {
    return (
        
        <div className="details">
            <h1>Edit Details</h1>
            <section className="details-container">
                
                <form className="account-form">
                    
                    <section className="inputs">
                        
                            <label for="username">Username</label>
                            <input id="username" />
                        
                            <label for="password">Email</label>
                            <input id="password" />
                        
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