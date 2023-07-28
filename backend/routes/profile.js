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
router.put('/updateListing', profileController.updateListing); // update listing

// CRUD - Messages
router.post('/sendMessage/:receiverId', profileController.sendMessage); // send message
// Incoming messages
router.delete('/deleteIncomingMessage/:userId/:messageIndex', profileController.deleteIncomingMessage); // delete incoming message - single
router.get('/readAllIncomingMessages/:userId', profileController.readAllIncomingMessages); // read all incoming messages
router.get('/readIncomingMessageByIndex/:userId/:messageIndex', profileController.readIncomingMessageByIndex); // read individual incoming messages
// Outgoing messages
router.get('/readAllOutgoingMessages/:userId', profileController.readAllOutgoingMessages); // read all outgoing messages
router.get('/readOutgoingMessageByIndex/:userId/:messageIndex', profileController.readOutgoingMessageByIndex); // read individual outgoing messages


module.exports = router;