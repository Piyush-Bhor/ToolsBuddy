import { useState, useEffect } from 'react';

// fetch data using given url
const useFetch = (url) => {
    const [listingData, setListingData] = useState([]);
    const [listings, setListings] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    

    const formatData = () =>{
        let temp = [];
        
        // put all listings in array for mapping
        for(let i = 0; i < listingData.length; i++){
            temp = temp.concat(listingData[i].itemsLend);
                //, listingData[i].itemsRented);
        }
        setListings(temp);
    }

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
            setListingData(data);
            setIsLoaded(true);
            formatData();
        })

        .catch(error => {
            if(url!="http://localhost:8080/rentals/searchRentalsByItemName/undefined"){
                setErrorMessage(error.message);
            }

            setIsLoaded(true);
        })
    }
    
    useEffect(()=>{
        setListingData(listingData);
    },[])

    useEffect(()=>{
        formatData();
    },[listingData])

    useEffect(()=>{
        fetchData();
    },[url])

    return {listingData, listings, isLoaded, errorMessage};
}
export default useFetch;