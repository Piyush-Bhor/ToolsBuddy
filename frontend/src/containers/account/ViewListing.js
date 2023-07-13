
import React, { useState, useEffect } from "react";
import Listings from '../../components/Listings';
import useFetch from '../../hooks/useFetch';

function ViewListing() {
    const url = "http://localhost:8080/rentals/getAllRentals";
    const {data: listingData, listings, isLoaded, errorMessage} = useFetch(url);

    return (

        <div className="view-listing">
            <section>
                <h1>Your Current Listings</h1>
                {!isLoaded && !errorMessage && <p>Loading...</p>}
                {errorMessage && !listingData && <p> {errorMessage}</p>}
                {listings && isLoaded && 
                <Listings className="small-listings" data={listings} />}
            </section>
        </div>
    );
}

export default ViewListing;