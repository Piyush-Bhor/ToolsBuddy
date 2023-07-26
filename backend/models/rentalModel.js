const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  
  username: String,
  itemsRented: [
    {
      itemName: String,
      itemDescription: String,
      itemTags: [String],
      itemPrice: Number,
      rentalPeriod: {
        from: Date,
        to: Date
      },
      itemImage: String
    }
  ],
  messages: {
    incoming: [Object],
    outgoing: [Object]
  },
  itemsLend: [
    {
      itemName: String,
      itemDescription: String,
      itemTags: [String],
      itemPrice: Number,
      rentalPeriod: {
        from: Date,
        to: Date
      },
      itemImage: String
    }
  ]

});

module.exports = mongoose.model('Rental', rentalSchema);