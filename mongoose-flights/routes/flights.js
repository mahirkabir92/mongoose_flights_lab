// routes/flights.js
const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

// GET form to add a new flight
router.get('/new', (req, res) => {
  res.render('flights/new');
});

router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find({}).exec(); // Use .exec() to return a promise
    res.render('flights/index', { flights });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// POST new flight data
router.post('/', async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.redirect('/flights');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// POST new destination for a specific flight
router.post('/:id/destinations', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id).exec(); // Use .exec() to return a promise
    flight.destinations.push(req.body);
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// GET flight details (show view) for a specific flight
router.get('/:id', async (req, res) => {
  try {
    // Find the flight by ID
    const flight = await Flight.findById(req.params.id);

    // Find all tickets associated with this flight
    const tickets = await Ticket.find({ flight: flight._id });

    // Render the 'flights/show' template and pass the flight and tickets data
    res.render('flights/show', { title: 'Flight Details', flight, tickets });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
