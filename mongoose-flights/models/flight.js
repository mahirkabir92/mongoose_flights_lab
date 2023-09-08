// models/flight.js
const mongoose = require('mongoose');
const destinationSchema = require('./destinationSchema');

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'], 
    required: true,
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], 
    default: 'DEN', 
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    required: true,
    default: () => new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // One year from now
  },
  destinations: [destinationSchema],
});

module.exports = mongoose.model('Flight', flightSchema);