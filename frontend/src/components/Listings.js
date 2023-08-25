/*
import {Link} from "react-router-dom";
import './components.css';
import React, { useState, useEffect } from "react";

function Listings(props) {
    const [slicedArray, setSlicedArray] = useState([]);
    
    useEffect(() => {
        setSlicedArray(props.data.slice(0, props.num));
      }, [props.data]); 
      
    return (
        
        <div className="listings-component">
            { props.data && (slicedArray.map((listing, i)=>{
            
            return(
                 
            <div className="list">
                <Link to={`/rental/${listing.originalId}/${listing[0].__id}`}>
                    
                <article className="single-listing" key={i}>
                    <img className="listing-img" alt="tool listing"
                    src={require("../assets/" + listing[0].itemImage)}></img>

                    <div className="listing-details" >
                        <p className="listing-name">{listing[0].itemName}</p>
                        <p className="listing-price">Starting at ${listing[0].itemPrice.toFixed(2)}</p>
                        <p className="description">{listing[0].itemDescription}</p>
                    </div>
                </article>
                </Link>
            </div>
        )}))}
        </div>
    );
}

export default Listings;
*/
import { Link } from "react-router-dom";
import './components.css';
import React, { useState, useEffect } from "react";

function Listings(props) {
    const [slicedArray, setSlicedArray] = useState([]);
    
    useEffect(() => {
        setSlicedArray(props.data.slice(0, props.num));
    }, [props.data]); 
      
    return (
        <div className="listings-component">
            {slicedArray.map((listing, index) => (
                <div className="list" key={index}>
                    <Link to={`/rental/${listing.originalId}/${listing._id}`}>
                        <article className="single-listing">
                            <img
                                className="listing-img"
                                alt="tool listing"
                                src={require("../assets/" + listing.itemImage)}
                            ></img>

                            <div className="listing-details">
                                <p className="listing-name">{listing.itemName}</p>
                                <p className="listing-price">
                                    Starting at ${listing.itemPrice.toFixed(2)}
                                </p>
                                <p className="description">{listing.itemDescription}</p>
                            </div>
                        </article>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Listings;
