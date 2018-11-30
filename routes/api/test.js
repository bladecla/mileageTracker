const express = require('express');
const Trip = require('./../../models/Trip');
const router = express.Router();

router.get("/", (req, res) => res.send("this is a test"));

router.post("/", (req, res) => {
    const trip = new Trip(req.body);
    if (trip) trip.save(function(err, trip){
      if (err) throw err;
      res.send(trip);
    });
  });

module.exports = router;