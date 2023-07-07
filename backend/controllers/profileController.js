const Rental = require('../models/rentalModel');

// Get All Rented Items by ID
const getRentedItemsByID = (req, res) => {
    const objectId = req.params.rentalID;
    Rental.find({ _id: objectId, itemsRented: { $exists: true, $not: { $size: 0 } } })
      .then((result) => {
        if (result) {
          return res.json(result[0].itemsRented);
        } else {
          return res.status(404).send('Listing Not Found');
        }
      })
      .catch((err) => {
        console.log('Error Retrieving Listing:', err);
        return res.status(500).send('Error Retrieving Listing');
      });
    };

// Get All Rented Items by ID
const getLendedItemsByID = (req, res) => {
    const objectId = req.params.rentalID;
    Rental.find({ _id: objectId, itemsLend: { $exists: true, $not: { $size: 0 } } })
      .then((result) => {
        if (result) {
          return res.json(result[0].itemsLend);
        } else {
          return res.status(404).send('Listing Not Found');
        }
      })
      .catch((err) => {
        console.log('Error Retrieving Listing:', err);
        return res.status(500).send('Error Retrieving Listing');
      });
    };

// Get User By ID
const getUserDetailsByID = (req, res) => {
  const objectId = req.params.userID;
  Rental.findOne({ _id: objectId })
    .then((result) => {
      if (result) {
        return res.json(result);
      } else {
        return res.status(404).send('User Not Found');
      }
    })
    .catch((err) => {
      console.log('Error Retrieving User:', err);
      return res.status(500).send('Error Retrieving User');
    });
}; 

// Create a new Posting - Work in Progress
const createPosting = (req, res) => {
  const { username, itemName, itemDescription, itemTags, itemPrice, rentalPeriod } = req.body;
  const newListing = new Rental({
    username,
    itemName,
    itemDescription,
    itemTags,
    itemPrice,
    rentalPeriod
  });

  newListing.save()
    .then(() => res.status(201).json({ message: 'Item listing created successfully' }))
    .catch((err) => {
      console.log('Error Creating Item Listing:', err);
      return res.status(500).send('Error Creating Item Listing');
  });
};
 
module.exports = {
    getRentedItemsByID,
    getLendedItemsByID,
    getUserDetailsByID,
    //createListing
    //viewPosting
    //deletePosting
    //updatePosting
};