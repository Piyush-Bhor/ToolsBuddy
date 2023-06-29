import './home.css';
import FullHero from '../../assets/full-working.png';
import Hero from '../../assets/working.png';
import {Link} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaHammer, FaConciergeBell, FaSearch, FaLeaf, FaBroom, FaPalette } from "react-icons/fa";

function Home() {
  // **** backend connection****
  // hold data here
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
      for(let i; i < data.length; i++){

      }
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
    <div className="home">
      {/* Hero image */}
      <section>
        <div className="heroResize">
          <div className="searchbar">
            <p className="hero-text">Borrow and lend tools.</p>

            {/* A form for the search bar */}
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Search..." value={name}
              onChange={(e) => setName(e.target.value)} />

              <select name="categories" id="categories">
                <option value="" disabled selected>Categories</option>
                <option value="hardware">Hardware</option>
                <option value="cooking">Cooking</option>
                <option value="gardening">Gardening</option>
                <option value="cleaning">Cleaning</option>
                <option value="arts">Arts & Crafts</option>
              </select>
              <button type="submit"><FaSearch alt="search icon" /></button>
            </form>
          </div>

          {/* Expanded version of hero image for smaller screens */}
          <img alt="woodworking" src={FullHero}></img>
        </div>

        <div className="hero">
          <img alt="woodworking" src={Hero}></img>
        </div>
      </section>

      <section className="categories">
        <div className="listing-heading">
          <h2>Shop by Category</h2>
        </div>
        <div className="category-container">
          <article className="category-box">
            <FaHammer className="icon" alt="hammer icon" />
            <p>Hardware</p>
          </article>
          <article className="category-box">
            <FaConciergeBell className="icon" alt="cooking icon" />
            <p>Cooking</p>
          </article>
          <article className="category-box">
          <FaLeaf className="icon" alt="plant icon" />
            <p>Gardening</p>
          </article>
          <article className="category-box">
          <FaBroom className="icon" alt="broom icon" />
            <p>Cleaning</p>
          </article>
          <article className="category-box">
          <FaPalette className="icon" alt="palette icon" />
            <p>Arts & Crafts</p>
          </article>
        </div>
      </section>

      <section className="listings">
        <div className="listing-heading">
          <h2>New Listings</h2>
          <Link to="/search">View All</Link>
        </div>
        
        <div className="listing-container">
          {!isLoaded && !errorMessage && <p>Loading...</p>}
          {errorMessage && <p> {errorMessage}</p>}

          {/* If data exists, map the available listings from the db */}
          {data && isLoaded && (data.map((listing, i)=>(
          
          <Link to={`/rental/${listing.itemsLend[0]._id}`}>
          <article  className="single-listing" key={i}>
            <img className="listing-img" alt="tool listing" 
            src={require("../../assets/" + listing.itemsLend[0].itemImage)}></img>

            <div className="details" >
              <p className="listing-name">{listing.itemsLend[0].itemName}</p>
              <p className="listing-price">Starting at ${listing.itemsLend[0].itemPrice}</p>
              <p className="description">{listing.itemsLend[0].itemDescription}</p>
            </div>
          </article>
          </Link>
          )))}
          
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
      </section>
    </div>
  );
}

export default Home;
