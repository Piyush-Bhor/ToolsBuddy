import { useState, useEffect } from 'react';

// fetch data using given url
const useFetch = (url) => {
    const [listings, setListings] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const fetchData = async() =>{
        setListings();
        setIsLoaded(false);
        setErrorMessage('');

        await fetch(url)
        
        .then(response => {
            if(!response.ok && url!="http://localhost:8080/rentals/searchRentalsByItemName/undefined"){
                throw Error('Could not fetch the data');
                //setErrorMessage('Could not fetch the data')
            }
            setIsLoaded(false);
            return response.json()
        })
    
        .then(data =>{
            setIsLoaded(true);
            setListings(data);
        })

        .catch(error => {
            if(url!="http://localhost:8080/rentals/searchRentalsByItemName/undefined"){
                setErrorMessage(error.message);
            }

            setIsLoaded(true);
        })
    }
    
    useEffect(()=>{
        setListings(listings);
    },[])

    useEffect(()=>{
        fetchData();
    },[url])

    return {listings, isLoaded, errorMessage};
}
export default useFetch;