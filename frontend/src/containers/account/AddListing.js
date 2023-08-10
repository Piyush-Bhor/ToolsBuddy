
import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
function AddListing() {
    function handleChange(){

    }

    return (
        
        <div className="add-listing">
            <h1>Add Listing</h1>
            <section>
                
                <form method="POST" action="http://localhost:8080/profile/createListing" className="listing-form">
                    <div className="inputs">
                        <label for="new-name">Listing Name</label>
                        <input id="new-name" name="itemName" onChange={handleChange} required />

                        <label for="new-price">Price</label>
                        <input id="new-price" name="itemPrice" onChange={handleChange} required />

                        <label for="new-description">Description</label>
                        <textarea 
                        id="new-description" 
                        name="itemDescription" 
                        rows="4"
                        placeholder="Add a description of your listing." 
                        onChange={handleChange}
                        required>
                        </textarea> 

                        <label for="new-tags">Tags</label>
                        <input id="new-tags" name="itemTags" onChange={handleChange} required
                        placeholder="Separate tags by comma" />

                        <button type="submit">Add Listing</button>
                    </div>
                    
                </form>
            </section>
        </div>
    );
}

export default AddListing;