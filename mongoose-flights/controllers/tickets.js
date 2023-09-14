const Ticket = require("../models/ticket");

function newTicketForm(req, res) {
  const flightId = req.params.id;
  res.render("tickets/new", { flightId });
}

async function createTicket(req, res) {
  try {
    const { seat, price } = req.body;
    const flightId = req.params.id;
    const ticket = new Ticket({ seat, price, flight: flightId });
    await ticket.save();
    res.redirect(`/flights/${flightId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  newTicketForm,
  createTicket,
};