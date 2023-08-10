

import Listings from '../../components/Listings';
import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useAuth0 } from "@auth0/auth0-react";

function ViewListing() {
    const [listings, setListings] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const url = "http://localhost:8080/rentals/getAllRentals"; 

    const { user } = useAuth0();

    const fetchData = () =>{
        setListings();
        setIsLoaded(false);
        setErrorMessage('');
        fetch(url)
        .then(response => {
            if(!response.ok){
                throw Error('Could not fetch the data');
            }
            else{
                setIsLoaded(false);
                return response.json()
            }
        })

        .then(data =>{
            setIsLoaded(true);
            setListings(data.filter(data=> user.nickname == data.username));
            /* console.log(listings) */
        })

        .catch(error => {
            setErrorMessage(error.message);
            setIsLoaded(true);
        })
    }

    useEffect(()=>{
        fetchData();
    },[url])

    /* useEffect(()=>{
        console.log(listings);
    },[listings]) */


    return (

        <div className="view-listing">
            <section>
                <h1>Your Current Listings</h1>
                {!isLoaded && !errorMessage && <p>Loading...</p>}
                {errorMessage && !listings && <p> {errorMessage}</p>}
                {listings && isLoaded && 
                <Listings data={listings} num={10} />}
            </section>
        </div>
    );
}

export default ViewListing;