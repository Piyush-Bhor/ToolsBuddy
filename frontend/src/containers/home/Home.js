import './home.css';
import useFetch from '../../hooks/useFetch';
import Listings from '../../components/Listings';
import FullHero from '../../assets/full-working.png';
import Hero from '../../assets/working.png';
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaMoneyBillWave, FaHandHoldingHeart} from "react-icons/fa";
import { RiEarthFill } from "react-icons/ri";
import Arts from '../../assets/arts.jpg';
import Cleaning from '../../assets/cleaning.jpg';
import Cooking from '../../assets/cooking.jpg';
import Gardening from '../../assets/gardening.jpg';
import Hardware from '../../assets/hardware.jpg';
import Paint from '../../assets/paint.jpg';
import Guitar from '../../assets/guitar.jpg';


function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const url = "http://localhost:8080/rentals/getAllRentals";
  const {data: listingData, listings, isLoaded, errorMessage} = useFetch(url);
  
  // redirect to search
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/search', {state:{query:query}});
  }

  return (
    <div className="home">

      {/* Hero image */}
      <section>
        <div className="heroResize">
          <div className="searchbar">
            <p className="hero-text">Borrow and lend tools.</p>

            {/* A form for the search bar */}
            <form className="home-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Search..." value={query}
              onChange={(e) => setQuery(e.target.value)} />

              <select name="categories" id="categories">
                <option value="" disabled selected>Categories</option>
                <option value="hardware">Hardware</option>
                <option value="cooking">Cooking</option>
                <option value="gardening">Gardening</option>
                <option value="cleaning">Cleaning</option>
                <option value="arts">Arts & Crafts</option>
              </select>
            
              <button><FaSearch alt="search icon" /></button>
            
            </form>
          </div>

          {/* Expanded version of hero image for smaller screens */}
          <img alt="woodworking" src={FullHero}></img>
        </div>

        <div className="hero">
          <img alt="woodworking" src={Hero}></img>
        </div>
      </section>
      
      <section className="perks">
        <div>
          <RiEarthFill className="perks-icon" alt="earth icon" />
          <h4>Eco Friendly</h4>
          <p>Reduce, reuse, recycle</p>
        </div>
        <div>
          <FaHandHoldingHeart className="perks-icon" alt="earth icon" />
          <h4>Borrow Local</h4>
          <p>Help your neighbours</p>
        </div>
        <div>
          <FaMoneyBillWave className="perks-icon" alt="earth icon" />
          <h4>Save Money</h4>
          <p>Save those hard earned dollars</p>
        </div>
      </section>

      <hr />

      <section className="category">
        <div className="category-container">
          <h2>Categories</h2>
          <div className="category-grid">
            <div className="category1">
              <img alt="arts and crafts" src={Arts}></img>
              <p>Arts & Crafts</p>
            </div>
            <div className="category2">
              <img alt="gardening" src={Gardening}></img>
              <p>Gardening</p>
            </div>
            <div className="category3">
              <img alt="hardware" src={Hardware}></img>
              <p>Hardware</p>
            </div>
            <div className="category4">
              <img alt="cleaning" src={Cleaning}></img>
              <p>Cleaning</p>
            </div>
            <div className="category5">
              <img alt="cooking" src={Cooking}></img>
              <p>Cooking</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="listings">
        <div className="listing-box">
          <div className="listing-heading">
            <h2>New Listings</h2>
            <Link to="/search">View All</Link>
          </div>
          
          <div className="listing-container">
            {!isLoaded && !errorMessage && <p>Loading...</p>}
            {errorMessage && !listingData && <p> {errorMessage}</p>}

            {listings && isLoaded && <Listings data={listings} num={4} />}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;