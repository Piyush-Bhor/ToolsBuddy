const Rental = require('../models/rentalModel');

// User Details

// Get All Rented Items by ID
const getRentedItemsByID = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }
  
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

// Get All Lended Items by ID
const getLendedItemsByID = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }
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
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }

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

// CRUD - Listing

// Create a new Listing - Need work
const createListing = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }
  const { itemName, itemDescription, itemTags, itemPrice, rentalPeriod, itemImage } = req.body;
  const username = req.oidc.user.nickname;
  const newRental = {
    username,
    itemName,
    itemDescription,
    itemTags,
    itemPrice,
    /* rentalPeriod,
    itemImage, */
  };

  Rental.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.itemsLend.push(newRental);
      return user.save();
    })
    .then(() => res.status(201).json({ message: 'Item listing created successfully' }))
    .catch((err) => {
      console.log('Error Creating Item Listing:', err);
      return res.status(500).send('Error Creating Item Listing');
    });
};

// Delete a Listing
const deleteListing = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }
  const { userID, itemIndex } = req.params;
  console.log(userID)
  Rental.findOne({ _id: userID })
    .then((user) => {
      if (!user) {
        console.log(user, userID)
        return res.status(404).json({ message: 'User not found' });
      }
      if (itemIndex < 0 || itemIndex > user.itemsLend.length) {
        return res.status(400).json({ message: 'Invalid item index' });
      }
      user.itemsLend.splice(itemIndex, 1);
      user.save();
      return res.status(200).json({ message: 'Item listing deleted successfully' })
    })
    .catch((err) => {
      console.log('Error Deleting Item Listing:', err);
      return res.status(500).send('Error Deleting Item Listing');
    });
};

// Update Listing
const updateListing = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }
  const { userID, itemIndex, itemName, itemDescription, itemTags, itemPrice, rentalPeriod, itemImage } = req.body;
  const updatedRental = {
    itemName,
    itemDescription,
    itemTags,
    itemPrice,
    rentalPeriod,
    itemImage,
  };

  Rental.findOne({ _id: userID })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (itemIndex < 0 || itemIndex > user.itemsLend.length) {
        return res.status(400).json({ message: 'Invalid item index' });
      }
      user.itemsLend[itemIndex] = updatedRental;
      user.save();
      return res.status(200).json({ message: 'Item listing updated successfully' })
    })
    .catch((err) => {
      console.log(userID);
      console.log('Error Updating Item Listing:', err);
      return res.status(500).send('Error Updating Item Listing');
    });
};

// CRUD - Messages

// Send message / Request Rental
const sendMessage = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }

  const receiverId = req.params.receiverId;
  const senderName = req.oidc.user.nickname;
  const newMessageContent = req.body.message;
  const pickupDate = req.body.pickupDate;
  const pickupTime = req.body.pickupTime;
  const returnDate = req.body.returnDate;
  const returnTime = req.body.returnTime;

  // Search Reciever
  Rental.findOne({ _id: receiverId })
    .then((receiver) => {
      if (!receiver) {
        return res.status(404).send('Receiver Not Found');
      }

      // Reciever - Incoming Message
      const newIncomingMessage = {
        senderName: senderName,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
        returnDate: returnDate,
        returnTime: returnTime,
        message: newMessageContent
      };

      // Sender - Outgoing Message
      const newOutgoingMessage = {
        receiverId: receiverId,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
        returnDate: returnDate,
        returnTime: returnTime,
        message: newMessageContent
      };

      receiver.messages.incoming.push(newIncomingMessage);

      // Search Sender
      Rental.findOne({ username: senderName })
        .then((sender) => {
          if (!sender) {
            return res.status(404).send('Sender Not Found');
          }

          sender.messages.outgoing.push(newOutgoingMessage);

          // Save Both
          Promise.all([receiver.save(), sender.save()])
            .then(() => {
              return res.json({
                receiverMessages: receiver.messages.incoming,
                senderMessages: sender.messages.outgoing
              });
            })
            .catch((err) => {
              console.log('Error saving receiver or sender:', err);
              return res.status(500).send('Error saving receiver or sender');
            });
        })
        .catch((err) => {
          console.log('Error retrieving sender:', err);
          return res.status(500).send('Error retrieving sender');
        });
    })
    .catch((err) => {
      console.log('Error retrieving receiver:', err);
      return res.status(500).send('Error retrieving receiver');
    });
};

// Incoming Messages

// Delete Incoming Message - single
const deleteIncomingMessage = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }
  const userId = req.params.userId; 
  const messageIndex = req.params.messageIndex;

  Rental.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User Not Found');
      }

      const incomingMessages = user.messages.incoming;

      if (messageIndex < 0 || messageIndex >= incomingMessages.length) {
        return res.status(400).send('Invalid Message Index');
      }

      incomingMessages.splice(messageIndex, 1);

      user.save()
        .then(() => {
          return res.json(incomingMessages);
        })
        .catch((err) => {
          console.log('Error saving user:', err);
          return res.status(500).send('Error saving user');
        });
    })
    .catch((err) => {
      console.log('Error retrieving user:', err);
      return res.status(500).send('Error retrieving user');
    });
};

// Read all incoming messages
const readAllIncomingMessages = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }

  const userId = req.params.userId;
  Rental.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User Not Found');
      }

      const incomingMessages = user.messages.incoming;

      return res.json(incomingMessages);
    })
    .catch((err) => {
      console.log('Error retrieving user:', err);
      return res.status(500).send('Error retrieving user');
    });
};

// Read a single incoming message
const readIncomingMessageByIndex = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }

  const userId = req.params.userId;
  const messageIndex = req.params.messageIndex;

  Rental.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User Not Found');
      }

      const incomingMessages = user.messages.incoming;

      if (messageIndex < 0 || messageIndex >= incomingMessages.length) {
        return res.status(400).send('Invalid Message Index');
      }

      const message = incomingMessages[messageIndex];

      return res.json(message);
    })
    .catch((err) => {
      console.log('Error retrieving user:', err);
      return res.status(500).send('Error retrieving user');
    });
};

// Outgoing Messages

// Read all outgoing messages
const readAllOutgoingMessages = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }

  const userId = req.params.userId;

  Rental.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User Not Found');
      }

      const outgoingMessages = user.messages.outgoing;

      return res.json(outgoingMessages);
    })
    .catch((err) => {
      console.log('Error retrieving user:', err);
      return res.status(500).send('Error retrieving user');
    });
};

// Read a single outgoing message
const readOutgoingMessageByIndex = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }

  const userId = req.params.userId;
  const messageIndex = req.params.messageIndex;

  Rental.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User Not Found');
      }

      const outgoingMessages = user.messages.outgoing;

      if (messageIndex < 0 || messageIndex >= outgoingMessages.length) {
        return res.status(400).send('Invalid Message Index');
      }

      const message = outgoingMessages[messageIndex];

      return res.json(message);
    })
    .catch((err) => {
      console.log('Error retrieving user:', err);
      return res.status(500).send('Error retrieving user');
    });
};

// Delete Outgoing Message - single
const deleteOutgoingMessage = (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }

  const userId = req.params.userId; 
  const messageIndex = req.params.messageIndex;

  Rental.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User Not Found');
      }

      const outgoingMessages = user.messages.outgoing;

      if (messageIndex < 0 || messageIndex >= outgoingMessages.length) {
        return res.status(400).send('Invalid Message Index');
      }

      outgoingMessages.splice(messageIndex, 1);

      user.save()
        .then(() => {
          return res.json(outgoingMessages);
        })
        .catch((err) => {
          console.log('Error saving user:', err);
          return res.status(500).send('Error saving user');
        });
    })
    .catch((err) => {
      console.log('Error retrieving user:', err);
      return res.status(500).send('Error retrieving user');
    });
};

module.exports = {
    getRentedItemsByID,
    getLendedItemsByID,
    getUserDetailsByID,
    createListing,
    deleteListing,
    updateListing,
    sendMessage,
    deleteIncomingMessage,
    readAllIncomingMessages,
    readIncomingMessageByIndex,
    readAllOutgoingMessages,
    readOutgoingMessageByIndex,
    deleteOutgoingMessage,
};