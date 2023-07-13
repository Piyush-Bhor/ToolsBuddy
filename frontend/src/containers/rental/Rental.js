import './rental.css';
import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Wrench from '../../assets/wrench.jpg';
function Rental() {
    const {id} = useParams();
    const [url, setUrl] = useState(`http://localhost:8080/rentals/getRentalByID/${id}`)
    const {data: listingData, listings, isLoaded, errorMessage} = useFetch(url);
    console.log(listings);
    return (
        
        <div className="rental">
            {/*Dummy listing*/}

            <p>{id}</p>
            <div className="rental-container">
                <section>
                    <h1>Wrench</h1>
                    <p>$5 per hour</p>
                    <img alt="guy holding wrench" src={Wrench}></img>
                    <h2>Details</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>
                </section>
                <section>
                <h2>Booking Dates</h2>
                <hr />
                <form className="rentalForm">
                    <div className="booking">
                        <h3>Pickup</h3>
                        <div>
                            <label for="pickupDate">Date</label>
                            <input type="date" id="pickupDate" name="pickupDate" /> 
                        </div>
                        <div>
                        <label for="pickupTime">Time</label>
                        <select name="pickupTime" id="pickupTime">
                            <option value="" disabled selected>Select a time</option>
                            <option value="11">11:00 AM</option>
                            <option value="12">12:00 PM</option>
                            <option value="13">1:00 PM</option>
                            <option value="14">2:00 PM</option>
                            <option value="15">3:00 PM</option>
                        </select>
                        </div>
                        
                    </div>
                    <div className="booking">
                        <h3>Return</h3>
                        <div>
                            <label for="returnDate">Date</label>
                            <input type="date" id="returnDate" name="returnDate" /> 
                        </div>
                        <div>
                            <label for="returnTime">Time</label>
                            <select name="returnTime" id="returnTime">
                                <option value="" disabled selected>Select a time</option>
                                <option value="11">11:00 AM</option>
                                <option value="12">12:00 PM</option>
                                <option value="13">1:00 PM</option>
                                <option value="14">2:00 PM</option>
                                <option value="15">3:00 PM</option>
                            </select>
                        </div>
                        
                    </div>
                    
                </form>
                </section>
            </div>
        </div>
    );
}

export default Rental;