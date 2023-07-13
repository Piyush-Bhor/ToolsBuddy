import './search.css';
import useFetch from '../../hooks/useFetch';
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import Listings from '../../components/Listings';

function Search() {
  const [query, setQuery] = useState();
  const [input, setInput] = useState();
  const location = useLocation();
  
  const url = `http://localhost:8080/rentals/searchRentalsByItemName/${query}`;

  // get data fetched using useFetch hook
  let {data: listingData, listings, isLoaded, errorMessage} = useFetch(url);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input);
  }

  useEffect(() => {
    // if query is coming from home page
    if(location.state){
      setQuery(location.state.query);
    }
    
    // only run once
  }, []); 

  return (
    <div className="search">
      <section>
        <div className="color-box"></div>
        <h1>Search</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Search..." value={input}
            onChange={(e) => setInput(e.target.value)}/>

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

        {listings && query && <h3>{listings.length} results</h3>}
        <div className="listing-container">
          
          {/* Loading and error message */}
          {!isLoaded && !errorMessage && <p>Loading...</p>}
          {errorMessage && !listingData && <p> {errorMessage}</p>}

          {/* If data exists, map the available listings from the db */}
          {listings && isLoaded && <Listings data={listings} num={10} />}
        </div>
      </section>
    </div>
  );
}

export default Search;
