

import Listings from '../../components/Listings';
import useFetch from '../../hooks/useFetch';

function ViewListing() {
    //const url = "http://localhost:8080/rentals/getAllRentals";
    /* const {userId} = useParams(); */
    //const url = `http://localhost:8080/profile/getUserDetailsByID/${userId}`;
    const url = "http://localhost:8080/profile/getRentedItems/647e6256cf9632b4ec39bbe2";
    const {data: listingData, listings, isLoaded, errorMessage} = useFetch(url);

    return (

        <div className="view-listing">
            <section>
                <h1>Your Current Listings</h1>
                {!isLoaded && !errorMessage && <p>Loading...</p>}
                {errorMessage && !listingData && <p> {errorMessage}</p>}
                {listings && isLoaded && 
                <Listings data={listings} num={10} />}
            </section>
        </div>
    );
}

export default ViewListing;