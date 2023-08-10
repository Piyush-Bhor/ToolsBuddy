
import React, { useState, useEffect } from "react";
import ImageUploading from 'react-images-uploading';
function AddListing() {
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemTags, setItemTags] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    
    

    /* 
    const [itemImage, setImages] = React.useState([]);
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    }; */


    async function create(e){
        e.preventDefault();
        await fetch("http://localhost:8080/profile/createListing", {
            method:'post',
            /* mode: 'cors', */
            headers: {
                'Content-Type': 'application/json',
                /* "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"  */
            },
            body: JSON.stringify({
                itemName: itemName,
                itemDescription: itemDescription,
                itemTags: itemTags,
                itemPrice: itemPrice,
                userId: "647e6256cf9632b4ec39bbe2"
                /*rentalPeriod: rentalPeriod,
                 itemImage: itemImage */
            })
        }).catch(error => {
            console.log(error);
        });
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

                        <label for="itemDescription">Description</label>
                        <textarea 
                        id="new-description" 
                        name="itemDescription" 
                        rows="4"
                        placeholder="Add a description of your listing." 
                        value = { itemDescription }
                        onChange={(e) => setItemDescription(e.target.value)}
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