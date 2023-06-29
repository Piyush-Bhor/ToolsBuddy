import './search.css';
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
  // **** backend connection****
  // hold data here
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [name, setName] = useState('');
  const [url, setUrl] = useState("http://localhost:8080/rentals/searchRentalsByTags/tools")


  const fetchData = async() =>{
    await fetch(url)
    .then(response => {
      if(!response.ok){
      throw Error('Could not fetch the data');
      }
      setIsLoaded(false);
      return response.json()
    })
    .then(data =>{
      setData(data);
      setIsLoaded(true);
    })

    .catch(error => {
        setErrorMessage(error.message);
    }) 
  }
  
  // when a component mounts (ie when it is inserted into the dom), call the api
  useEffect(() => {
    fetchData();
    
  // this hook is only called when the url changes
  }, [url]); 

  // make sure data is loaded on the page
  useEffect(()=>{
    setData(data);
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
  }
  return (
    <div className="search">
      <section>
        <h1>Search</h1>
        <form>
          <input type="text" placeholder="Search..." />
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
      <section className="results">
        <div className="listing-container">
          {!isLoaded && !errorMessage && <p>Loading...</p>}
          {errorMessage && <p> {errorMessage}</p>}

          {/* If data exists, map the available listings from the db */}
          {data && isLoaded && (data.map((listing, i)=>(

          <article className="single-listing" key={i}>
            <img className="listing-img" alt="tool listing" 
            src={require("../../assets/" + listing.itemsLend[0].itemImage)}></img>

            <div className="details" >
              <p className="listing-name">{listing.itemsLend[0].itemName}</p>
              <p className="listing-price">Starting at ${listing.itemsLend[0].itemPrice}</p>
              <p className="description">{listing.itemsLend[0].itemDescription}</p>
            </div>
          </article>
          )))}
          </div>
      
      </section>
    </div>
  );
}

export default Search;
