
import React, { useState, useEffect } from "react";
import ImageUploading from 'react-images-uploading';
import { useAuth0 } from "@auth0/auth0-react";

function AddListing() {
    /* const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemTags, setItemTags] = useState("");
    const [itemPrice, setItemPrice] = useState(""); */
    
    /* 
    const [itemImage, setImages] = React.useState([]);
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    }; */
    const { user } = useAuth0();

    return (
        
        <div className="add-listing">
            <h1>Add Listing</h1>
            <section>
                
                <form method="POST" 
                action="http://localhost:8080/profile/createListing" 
                className="listing-form"
                /* enctype="multipart/form-data" */
                >
                   
                    <div className="inputs">
                        <input id="username" name="username" value={user.nickname} hidden /> 

                        <label for="itemName">Listing Name</label>
                        <input id="itemName" name="itemName" required />

                        <label for="rentalPeriod">Rental Period</label>
                        <input type="date" id="rentalPeriod" name="rentalPeriod" />

                        {/* <label for="rentalPeriod">Rental Period</label>
                        <input type="date" id="rentalPeriod" name="rentalPeriod" /> */}

                        <label for="itemImage">Item image</label>
                        {/* <input type="file" name="itemImage" id="itemImage" /> */}
                        <input id="itemImage" name="itemImage" />

                        <label for="itemPrice">Price</label>
                        <input id="itemPrice" name="itemPrice" required />

                        <label for="itemDescription">Description</label>
                        <textarea 
                        id="itemDescription" 
                        name="itemDescription" 
                        rows="4"
                        placeholder="Add a description of your listing." 
                        /* value = { itemDescription }
                        onChange={(e) => setItemDescription(e.target.value)} */
                        required>
                        </textarea> 

                        <label for="itemTags">Tags</label>
                        <input id="itemTags" name="itemTags" />

                        <button type="submit">Add Listing</button>
                    </div>
                    
                </form>
            </section>
        </div>
    );
}

export default AddListing;