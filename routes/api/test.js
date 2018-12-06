const express = require('express');
const Trip = require('./../../models/Trip');
const User = require('./../../models/User');
const router = express.Router();

router.get("/", (req, res) => res.send("this is a test"));

router.post("/", (req, res) => {
    const trip = new Trip(req.body);
    if (trip) trip.save(function(err, trip){
      if (err) throw err;
      res.send(trip);
    });
  });

router.post("/register", (req, res) => {
  const user = new User(req.body);
  if (user) user.save(function(err, user){
    if (err){
      res.send(err);
      throw err;
    }
    res.send(user);
  })
});

router.put("/:id/addTrip", (req, res) => {
  const trip = new Trip(req.body);
  if (trip) {
    User.findByIdAndUpdate({ _id: req.params.id }, {$push: {trips: trip}}, {new: true}, function(err, user){
      if (err){
        console.error(err);
        throw err;
      }
      res.send(user);
    })
  }
});

router.put("/edit/:userId/:tripId", (req, res) => {
  if (req.body && req.params) {
    const {userId, tripId} = req.params;
    const changes = {};
    for (let field in req.body){
      changes["trips.$." + field] = req.body[field];
    }

    User.findOneAndUpdate({"trips._id": tripId}, {$set: changes}, {new: true}, function(err, user){
      if (err) console.error(err);
      res.send(user.trips);
    });
  }
});

module.exports = router;