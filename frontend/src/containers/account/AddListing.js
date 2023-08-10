
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
                
                <form method="post" onSubmit={create} className="listing-form">
                    <div className="inputs">
                        {/* 
                        <ImageUploading
                        multiple
                        value={itemImage}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                        <div className="upload__image-wrapper">
                            <button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                            >
                            Add Image
                            </button>
                            &nbsp;
                            <button onClick={onImageRemoveAll}>Remove</button>
                            {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>Update</button>
                                <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                            ))}
                        </div>
                        )}
                        </ImageUploading> */}

                        <label for="itemName">Listing Name</label>
                        <input id="itemName" 
                        value = { itemName }
                        onChange={(e) => setItemName(e.target.value)}
                        required />

                        <label for="itemPrice">Price</label>
                        <input id="itemPrice" 
                        value = { itemPrice }
                        onChange={(e) => setItemPrice(e.target.value)} 
                        required />

                        <label for="itemDescription">Description</label>
                        <textarea 
                        id="itemDescription" 
                        name="itemDescription" 
                        rows="4"
                        placeholder="Add a description of your listing." 
                        value = { itemDescription }
                        onChange={(e) => setItemDescription(e.target.value)}
                        required>
                        </textarea> 

                        <label for="itemTags">Tags</label>
                        <input id="itemTags" 
                        value = { itemTags }
                        onChange={(e) => setItemTags(e.target.value)}
                        required
                        placeholder="Separate tags by comma" />

                        <button type="submit">Add Listing</button>
                    </div>
                    
                </form>
            </section>
        </div>
    );
}

export default AddListing;