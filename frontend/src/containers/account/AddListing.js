
import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
function AddListing() {
    function handleChange(){

    }

    return (
        
        <div className="add-listing">
            <h1>Add Listing</h1>
            <section>
                
                <form className="listing-form">
                    <div className="inputs">
                        <label for="new-name">Listing Name</label>
                        <input id="new-name" onChange={handleChange} required />

                        <label for="new-price">Price</label>
                        <input id="new-price" onChange={handleChange} required />

                        <label for="new-description">Description</label>
                        <textarea 
                        id="new-description" 
                        name="new-description" 
                        rows="4"
                        placeholder="Add a description of your listing." 
                        onChange={handleChange}
                        required>
                        </textarea> 

                        <label for="new-tags">Tags</label>
                        <input id="new-tags" onChange={handleChange} required
                        placeholder="Separate tags by comma" />

                        <button type="submit">Add Listing</button>
                    </div>
                    
                </form>
            </section>
        </div>
    );
}

export default AddListing;