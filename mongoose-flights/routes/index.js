// routes/index.js
const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

// GET all flights
router.get('/', function (req, res) {
    res.redirect('/flights'); 
  });
  

module.exports = router;
