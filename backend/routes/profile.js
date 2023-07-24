const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Get User Details
router.get('/getRentedItems/:rentalID', profileController.getRentedItemsByID); // get rentals of a user by ID
router.get('/getLendItems/:rentalID', profileController.getLendedItemsByID); // get lended items of a user by ID
router.get('/getUserDetailsByID/:userID', profileController.getUserDetailsByID); // get user details by ID

// CRUD - Listings
router.post('/createListing', profileController.createListing); // create new listing
router.delete('/deleteListing/:userID/:itemIndex', profileController.deleteListing); // delete listing

module.exports = router;