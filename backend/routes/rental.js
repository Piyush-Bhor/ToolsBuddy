const express = require('express');
const router = express.Router();
const rentalsController = require('../controllers/rentalsController');

router.get('/getRentalByID/:rentalID', rentalsController.getRentalByID); // get rentals by ID
router.get('/getRentalsByItemName/:itemName', rentalsController. getRentalsByItemName); // get a specific rental by Name
router.get('/getAllRentals', rentalsController.getAllRentals); // get all rentals
router.get('/searchRentalsByTags/:Tags', rentalsController.searchRentalsByTags); // search rentals by Tags
router.get('/searchRentalsByItemName/:itemName', rentalsController. searchRentalsByItemName); // search for rentals by their Name

module.exports = router;