
import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
function Details() {
    return (
        
        <div className="details">
            <section className="details-container">
                <h1>Edit Details</h1>
                <form className="account-form">
                    <h3>Personal Information</h3>
                    <section>
                        <div>
                            <label for="username">Username</label>
                            <input id="username" />
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input id="password" />
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input id="password" />
                        </div>
                    </section>
                    
                    <button type="submit">Save</button>
                </form>
            </section>
        </div>
    );
}

export default Details;