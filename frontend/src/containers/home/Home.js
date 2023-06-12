import './home.css';
import FullHero from '../../assets/full-working.png';
import Hero from '../../assets/working.png';
import Hammer from '../../assets/hammer.jpg';
import Wrench from '../../assets/wrench.jpg';
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

function Home() {
  /* //test backend connection
  //hold data here
  const [data, setData] = useState("");

  //access api endpoint
  const url="http://localhost:8080/getAllRentals";

  //when a component mounts (ie when it is inserted into the dom), call the api
  useEffect(() => {
    const fetchData = async() =>{
      const response = await fetch(url);
      const newData = await response.json();
      setData(newData);
  }
      
  fetchData();

  //empty array as second argument so this hook is only called once
  }, []); */

  return (
    <div className="home">
      {/* <p>{data}</p> */}
      <section>
        <div className="heroResize">
          <div className="searchbar">
            <p className="hero-text">Borrow and lend tools.</p>
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
          </div>
          <img alt="woodworking" src={FullHero}></img>
        </div>
        <div className="hero">
          <img alt="woodworking" src={Hero}></img>
        </div>
      </section>
      <section className="listings">
        <h2>New Listings</h2>
        <div className="grid-container">
          
          {/* Dummy listings */}
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
          </article>

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
          </article>
          
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
          </article>

        </div>
      </section>
    </div>
  );
}

export default Home;
