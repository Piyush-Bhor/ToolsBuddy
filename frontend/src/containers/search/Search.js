import './search.css';
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
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
        <div className="grid-container">

        </div>
      </section>
    </div>
  );
}

export default Search;
