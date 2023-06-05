const express = require('express');
const router = express.Router();
const rentalsController = require('../controllers/rentalsController');

router.get('/getRentalByID/:rentalID', rentalsController.getRentalByID); // get rentals by ID
router.get('/getAllRentals', rentalsController.getAllRentals); // get all rentals
router.get('/getRentalsByTags/:Tags', rentalsController.getRentalsByTags); // get rentals by Tags
router.get('/getRentalsByItemName/:itemName', rentalsController. getRentalsByItemName); // get rentals by Item Name

module.exports = router;