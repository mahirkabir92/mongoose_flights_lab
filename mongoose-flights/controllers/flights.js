const Flight = require('../models/flight')



async function create(req, res) {
    try {
        await Flight.create(req.body)
        res.redirect('/flights')
    } catch (err) {
        console.log(err)
        res.render('flight/new', { errorMsg: err.message })
    }
}

function newFlight(req, res, next) {
    res.render('flight/new', { title: 'New Flight',
        errorMsg: ''
    })
}

async function index(req, res, next) {
    const flights = await Flight.find()
    res.render('flight/index', { title: "Flight index",
        flights
    })
}

async function show(req, res) {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/show', { title: 'Flight Details', flight });
  }

  module.exports = {
    newFlight,
    create,
    index,
    show
  }