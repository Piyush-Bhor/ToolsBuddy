import './search.css';
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';

function Search() {
  // **** backend connection****
  // hold data here
  const [listingData, setListingData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState();
  const location = useLocation();
  const [listings, setListings] = useState([]);
  

  const handleQuery = (query) =>{
    setUrl(`http://localhost:8080/rentals/searchRentalsByItemName/${query}`);
    console.log(query);
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    handleQuery(query);
  }

  const fetchData = async() =>{
    if(url){
      setIsLoaded(false);
      await fetch(url)
      .then(response => {
        if(!response.ok){
          throw Error('Could not fetch the data');
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
        setErrorMessage(error.message);
      }) 
    }
    else{
      setIsLoaded(true);
    }
  }
  const formatData = () =>{
    let temp = [];
    
    for(let i = 0; i < listingData.length; i++){
      temp = temp.concat(temp, listingData[i].itemsLend, listingData[i].itemsRented);
    }
    setListings(temp);
    
  }

  // when a component mounts (ie when it is inserted into the dom), call the api
  useEffect(() => {
    // if query is coming from home page
    if(location.state){
      handleQuery(location.state.query);
    }
    
    setListingData(listingData);
    
    // only run once
  }, []); 

  useEffect(()=>{
    fetchData();
    
    setListings(listings);
    // run when url changes
  },[url])

  return (
    <div className="search">
      <section>
        <h1>Search</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Search..." value={query}
            onChange={(e) => setQuery(e.target.value)}/>

          <select name="categories" id="categories">
            <option value="" disabled selected>Categories</option>
            <option value="hardware">Hardware</option>
            <option value="cooking">Cooking</option>
            <option value="gardening">Gardening</option>
            <option value="cleaning">Cleaning</option>
            <option value="arts">Arts & Crafts</option>
          </select>
          <button type="submit"><FaSearch /></button>
        </form>
      </section>

      {/*maybe make this a component later*/}
      <section className="listings">

        {url && <h3>{listings.length} results</h3>}

        <div className="listing-container">
          
          {/* Loading and error message */}
          {!isLoaded && !errorMessage && <p>Loading...</p>}
          {errorMessage && !listingData && <p> {errorMessage}</p>}

          {/* If data exists, map the available listings from the db */}
          {listingData && listings && isLoaded && (listings.map((listing, i)=>{

            return(
            <div>
              
              <Link to={`/rental/${listing._id}`}>
                
              <article className="single-listing" key={i}>
                <img className="listing-img" alt="tool listing"
                src={require("../../assets/" + listing.itemImage)}></img>

                <div className="details" >
                  <p className="listing-name">{listing.itemName}</p>
                  <p className="listing-price">Starting at ${listing.itemPrice.toFixed(2)}</p>
                  <p className="description">{listing.itemDescription}</p>
                </div>

              </article>
              </Link>
            </div>
          )}))}
        </div>
      </section>
    </div>
  );
}

export default Search;
