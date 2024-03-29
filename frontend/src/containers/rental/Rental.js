import './rental.css';
import {useParams} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ModalImage from "react-modal-image";
import { useAuth0 } from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";

function Rental() {
    // get id and index from url
    const {id, index} = useParams();
    console.log(id, index);
    const url = `http://localhost:8080/rentals/getRentalByID/${id}/${index}`
    const {data: listingData, listings, isLoaded, errorMessage} = useFetch(url);
    const { isAuthenticated } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        if(!isAuthenticated){
            // login the user
            loginWithRedirect()
        }
        else{
            // redirect to messages page
            navigate('/account');
        }
    }
    
    return (
        <div className="rental">
            <div className="rental-container">
                {!isLoaded && !errorMessage && <p>Loading...</p>}
                {errorMessage && !listingData && <p> {errorMessage}</p>}
                
                {listings && isLoaded &&
                <section>
                    {/* modal image component lets you view large version of image... needs fixing */}
                    <ModalImage
                    className="small"
                    small={require("../../assets/" + listings.itemImage)}
                    large={require("../../assets/" + listings.itemImage)}
                    alt="Rental Image"
                    />
                </section>}

                <section className="item-details">
                    {listings && isLoaded &&
                    <div>
                        <h1>{listings.itemName}</h1>
                        
                        <div className="tag-list">
                            {listings.itemTags.map((tag, i)=>{
                            return(  
                                <div key={i}>
                                    <button className="tag">{tag}</button>
                                </div>
                            )})}
                        </div>

                        <h3 className="price">${listings.itemPrice}</h3>
                        <p className="description">{listings.itemDescription}</p>
                    </div>}

                    <form className="rentalForm" onSubmit={handleSubmit}>
                        <div className="booking-container">
                            <div className="booking pickup">
                                <h3>Pickup</h3>
                                {listings && isLoaded &&
                                <div>
                                    <label for="pickupDate">Date</label>
                                    <input type="date" id="pickupDate" name="pickupDate"
                                    value={listings.rentalPeriod.from.substring(0,10)}
                                    min={listings.rentalPeriod.from.substring(0,10)} max={listings.rentalPeriod.to.substring(0,10)} /> 
                                </div>}
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

                            {/* vertical line */}
                            <div class="vl"></div>
                            <div className="booking return">
                                <h3>Return</h3>
                                {listings && isLoaded &&
                                <div>
                                    <label for="returnDate">Date</label>
                                    <input type="date" id="returnDate" name="returnDate"
                                    value={listings.rentalPeriod.from.substring(0,10)}
                                    min={listings.rentalPeriod.from.substring(0,10)} max={listings.rentalPeriod.to.substring(0,10)} /> 
                                </div>}
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
                            <div className="booking-finalize">
                            
                            <label for="message">Message (optional)</label>
                            <textarea id="message" placeholder="Type your message here..."></textarea>
                            
                            
                            <button type="submit">Request Rental</button>
                        </div>
                        </div>
                        
                        
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Rental;