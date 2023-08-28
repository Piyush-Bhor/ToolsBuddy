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
  Rental.findOne({ 'itemsLend.itemName': itemName })
    .then((result) => {
      if (result) {
        const item = result.itemsLend.find((item) => item.itemName === itemName);
        if (item) {
          const rentalID = result._id.toString();
          const itemWithOriginalID = {
            ...item,
            originalId: rentalID
          };
          const { $__parent, $__, _doc, $isNew, ...resItem } = itemWithOriginalID; // To remove unrequired fields
          return res.json(resItem);
        } else {
          return res.status(404).send('Item Not Found');
        }
      } else {
        return res.status(404).send('Listing Not Found');
      }
    })
    .catch((err) => {
      console.log('Error Retrieving Listing:', err);
      return res.status(500).send('Error Retrieving Listing');
    });
};

// get All Rentals
const getAllRentals = (req, res) => {
  Rental.find()
    .then((rentals) => {
      const itemsLend = [];
      
      rentals.forEach((rental) => {
        rental.itemsLend.forEach((itemLend, itemIndex) => {
          if (itemIndex === itemLend.__index) {
            const itemWithRentalId = {
              itemLend,
              originalId: rental._id.toString(),
              itemIndex: itemIndex
            };
            itemsLend.push(itemWithRentalId);
          }
        });
      });

      if (itemsLend.length > 0) {
        res.json(itemsLend);
      } else {
        res.status(404).send('Listing Not Found');
      }
    })
    .catch((err) => {
      console.log('Error retrieving listings:', err);
      res.status(500).send('Error Retrieving Listings');
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
        const items = [];
        results.forEach((rental) => {
          rental.itemsLend.forEach((item) => {
            if (item.itemTags.some((tag) => tags.includes(tag))) {
              const rentalID = rental._id.toString();
              const itemWithOriginalID = {
                ...item,
                originalId: rentalID
              };
              const { $__parent, $__, _doc, $isNew, ...resItem } = itemWithOriginalID; // To remove unrequired fields
              items.push(resItem);
            }
          });
        });
        return res.json(items);
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
  const searchQuery = req.params.itemName.split(',');
  if (searchQuery.length === 0) {
    return res.status(400).send('Listing Not Found');
  }

  const regexPatterns = searchQuery.map(query => new RegExp(query, 'i'));

  Rental.find({ 'itemsLend.itemName': { $in: regexPatterns } })
    .then((results) => {
      if (results.length > 0) {
        const itemsLend = [];
        results.forEach((rental) => {
          rental.itemsLend.forEach((itemLend, itemIndex) => {
            if (regexPatterns.some(regex => regex.test(itemLend.itemName))) {
              const itemWithOriginalID = {
                itemLend,
                originalId: rental._id.toString(),
                itemIndex: itemIndex
              };
              itemsLend.push(itemWithOriginalID);
            }
          });
        });
        return res.json(itemsLend);
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