const express = require('express');
const router = express.Router();
const rentalsController = require('../controllers/rentalsController');

// get rentals by ID
router.get('/getRentalByID/:rentalID', rentalsController.getRentalByID);

// get all rentals
router.get('/getAllRentals', rentalsController.getAllRentals);


module.exports = router;