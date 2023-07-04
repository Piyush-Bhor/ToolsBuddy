import './rental.css';
import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

function Rental() {
    const {id} = useParams();
    const [url, setUrl] = useState(`http://localhost:8080/rentals/getRentalByID/${id}`)
    const {data: listingData, listings, isLoaded, errorMessage} = useFetch(url);
    
    return (
        
        <div>
            <p>hi</p>
            <p>{id}</p>
            <div className="listing-container">
          
          {/* Loading and error message */}
          {!isLoaded && !errorMessage && <p>Loading...</p>}
          {errorMessage && !listingData && <p> {errorMessage}</p>}

          {/* If data exists, map the available listings from the db */}
          { listings && isLoaded && (listings.map((listing, i)=>{

            return(
            <div>
              
              
              <article className="single-listing" key={i}>
                <img className="listing-img" alt="tool listing"
                src={require("../../assets/" + listing.itemImage)}></img>

                <div className="details" >
                  <p className="listing-name">{listing.itemName}</p>
                  <p className="listing-price">Starting at ${listing.itemPrice.toFixed(2)}</p>
                  <p className="description">{listing.itemDescription}</p>
                </div>

              </article>
            </div>
          )}))}
          
          {/* Dummy listing

          <article class="single-listing">
            <img alt="guy holding wrench" src={Wrench}></img>
            <div className="details">
              <p className="listing-name">Wrench</p>
              <p className="listing-price">$5 per hour</p>
              <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
              </p>
            </div>
          </article>*/}

        </div>
        </div>
    );
}

export default Rental;