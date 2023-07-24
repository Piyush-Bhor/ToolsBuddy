import {Link} from "react-router-dom";
import './components.css';
import React, { useState, useEffect } from "react";

function Listings(props) {
    const [slicedArray, setSlicedArray] = useState([]);
    
    useEffect(() => {
        setSlicedArray(props.data.slice(0, props.num));
        console.log(props.data)
      }, [props.data]); 
      
    return (
        
        <div className="listings-component">
            { props.data && (slicedArray.map((listing, i)=>{
            
            return(
                 
            <div>
                <Link to={`/rental/${listing.originalId}/${listing.__index}`}>
                    
                <article className="single-listing" key={i}>
                    <img className="listing-img" alt="tool listing"
                    src={require("../assets/" + listing.__parentArray[0].itemImage)}></img>

                    <div className="listing-details" >
                        <p className="listing-name">{listing.__parentArray[0].itemName}</p>
                        <p className="listing-price">Starting at ${listing.__parentArray[0].itemPrice.toFixed(2)}</p>
                        <p className="description">{listing.__parentArray[0].itemDescription}</p>
                    </div>
                </article>
                </Link>
            </div>
        )}))}
        </div>
    );
}

export default Listings;