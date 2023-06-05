const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  itemDescription: {
    type: String,
    required: true
  },
  itemTags: {
    type: [String],
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  },
  rentalPeriod: {
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    }
  },
  messages: {
    incoming: {
      type: [String],
      default: []
    },
    outgoing: {
      type: [String],
      default: []
    }
  }
});

module.exports = mongoose.model('Rental', rentalSchema);