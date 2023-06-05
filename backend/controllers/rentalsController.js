const request = require('request');
const Rental = require('../models/rentalModel');

// Get Rental by ID
const getRentalByID = (req, res) => {
  const objectId = req.params.rentalID;
  Rental.findOne({ _id: objectId })
    .then((result) => {
      if (result) {
        return res.json(result);
      } else {
        return res.status(404).send('Listing Not Found');
      }
    })
    .catch((err) => {
      console.log('Error Retrieving Listing:', err);
      return res.status(500).send('Error Retrieving Listing');
    });
};

// Get All Rentals 
const getAllRentals = (req, res) => {
    Rental.find()
      .distinct('username')
      .then((rentals) => {
        if (rentals && rentals.length > 0) {
          return res.json(rentals);
        } else {
          return res.status(404).send('Listing Not Found');
        }
    })
    .catch((err) => {
    console.log('Error retrieving listings:', err);
    return res.status(500).send('Error Retrieving Listings');
    });
};

// get Rentals by Tags
const getRentalsByTags = (req, res) => {
    const tags = req.params.Tags.split(',');
    Rental.find({ itemTags: { $in: tags } })
      .then((results) => {
        if (results.length > 0) {
          return res.json(results);
        } else {
          return res.status(404).send('Listings Not Found');
        }
    })
    .catch((err) => {
    console.log('Error Retrieving Listings:', err);
    return res.status(500).send('Error Retrieving Listings');
    });
};

// get Rentals by Item Name
const getRentalsByItemName = (req, res) => {
    const itemName = req.params.itemName;
    Rental.findOne({ itemName: itemName })
      .then((result) => {
        if (result) {
          return res.json(result);
        } else {
          return res.status(404).send('Listing Not Found');
        }
      })
      .catch((err) => {
        console.log('Error Retrieving Listing:', err);
        return res.status(500).send('Error Retrieving Listing');
      });
  };
  
module.exports = {
    getRentalByID,
    getAllRentals,
    getRentalsByTags,
    getRentalsByItemName,
};