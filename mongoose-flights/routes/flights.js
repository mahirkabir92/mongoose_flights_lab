// routes/flights.js
const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

// GET form to add a new flight
router.get('/new', (req, res) => {
  res.render('flights/new');
});

router.get('/', async (req, res) => {
    try {
      const flights = await Flight.find({});
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

// GET flight details (show view) for a specific flight
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/show', { flight });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// POST new destination for a specific flight
router.post('/:id/destinations', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    flight.destinations.push(req.body);
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

