const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  seat: {
    type: String,
    required: true,
    match: /[A-F][1-9]\d?/, // Regex pattern for seat 'A1' through 'F99'
  },
  price: {
    type: Number,
    min: 0, // Minimum price must be 0 or greater
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight', // Reference to the Flight model
    required: true,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;