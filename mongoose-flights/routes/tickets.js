// routes/tickets.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const ticketsCtrl = require('../controllers/tickets');

// Display form to create a new ticket
router.get('/flights/:id/tickets/new', ticketsCtrl.newTicketForm);

// Create a new ticket
router.post('/flights/:id/tickets', ticketsCtrl.createTicket, async (req, res) => {
  try {
    // Add the flight property to the ticket object
    req.body.flight = req.params.id;

    // Create a new ticket
    const ticket = new Ticket(req.body);
    await ticket.save();

    // Redirect back to the flight's show view
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
