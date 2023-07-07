const Rental = require('../models/rentalModel');

// Get Rental by ID
const getRentalByID = (req, res) => {
  const objectId = req.params.rentalID;
  const itemNum = req.params.itemNum;

  Rental.findOne({ _id: objectId })
    .then((result) => {
      if (result) {
        const itemsLend = result.itemsLend;
        if (itemsLend && itemsLend.length > itemNum) {
          return res.json(itemsLend[itemNum]);
        } else {
          return res.status(404).send('Item Not Found');
        }
      } else {
        return res.status(404).send('Rental Not Found');
      }
    })
    .catch((err) => {
      console.log('Error Retrieving Rental:', err);
      return res.status(500).send('Error Retrieving Rental');
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

// Get All Rentals 
const getAllRentals = (req, res) => {
  Rental.find()
    .then((rentals) => {
      const itemsLend = rentals.flatMap((rental) => rental.itemsLend);
      if (itemsLend && itemsLend.length > 0) {
        return res.json(itemsLend);
      } else {
        return res.status(404).send('Listing Not Found');
      }
    })
    .catch((err) => {
      console.log('Error retrieving listings:', err);
      return res.status(500).send('Error Retrieving Listings');
    });
};

// search Rentals by Tags
const searchRentalsByTags = (req, res) => {
    const tags = req.params.Tags.split(',');
    if (tags.length === 0) {
      return res.status(400).send('Invalid Tags');
    }
    Rental.find({ 'itemsLend.itemTags': { $in: tags } })
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

// search Rentals by Name
const searchRentalsByItemName = (req, res) => {
  const search_query = req.params.itemName.split(',');
  if (search_query.length === 0) {
    return res.status(400).send('Listing Not Found');
  }
  Rental.find({ 'itemsLend.itemName': { $in: search_query } })
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
  
module.exports = {
    getRentalByID,
    getAllRentals,
    getRentalsByItemName,
    searchRentalsByTags,
    searchRentalsByItemName,
};