import './home.css';
import Hero from '../../assets/working.png';
import Hammer from '../../assets/hammer.jpg';
import Wrench from '../../assets/wrench.jpg';
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

function Home() {
  /*test backend connection
  const [message, setMessage] = useState("");

  //when a component mounts (ie when it is inserted into the dom), call the api
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => setMessage(data));

  //empty array as second argument so this hook is only called once
  }, []);*/
  return (
    <div className="home">
      {/*<h1>{message}</h1>*/}
      <section className="searchbar">
        <p className="hero-text">Borrow and lend tools.</p>
        <form>
          <input type="text" placeholder="Search..." />
          <button type="submit"><FaSearch /></button>
        </form>
      </section>
      <div className="hero">
        <img alt="woodworking" src={Hero}></img>
      </div>
      
      <section className="listings">
        <h2>New Listings</h2>
        <div className="grid-container">
          
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
