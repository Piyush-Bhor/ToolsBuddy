import './rental.css';
import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';


function Rental() {
    const {id} = useParams();
    return (
        
        <div>
            <p>hi</p>
            <p>{id}</p>
{/* <div className="rental">
            <p>{id}</p>
            <p>{name}</p>
            <p>{description}</p>
            <p>{image}</p>
        </div> */}
        </div>
    );
}

export default Rental;