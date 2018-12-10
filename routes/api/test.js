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

//User operations

//create
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

//render
router.get("/users/:userId", (req, res) => {
  User.findById({ _id: req.params.userId }, function(err, user){
    if (err) console.error(err)
    res.send(user)
  })
});

//Trip operations

//create
router.post("/users/:userId/addTrip", (req, res) => {
  const trip = new Trip(req.body);
  if (trip) {
    User.findByIdAndUpdate({ _id: req.params.userId }, {$push: {trips: trip}}, {new: true}, function(err, user){
      if (err){
        console.error(err);
        throw err;
      }
      res.send(user);
    })
  }
});

//render
router.get("/users/:userId/trips", (req, res) => {
  User.findById(req.params.userId, function(err, user){
    if (err) console.error(err)
    res.send(user.trips)
  })
});

//update
router.put("/edit/:tripId", (req, res) => {
  if (req.body && req.params) {
    const {tripId} = req.params;
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

//delete
router.delete("/delete/:tripId", (req, res) => {
  User.findOneAndUpdate({"trips._id": req.params.tripId}, { $pull: { trips: { _id: req.params.tripId } } }, {new: true}, function(err, user){
    if (err) console.error(err)
    res.send(user ? user.trips : "Not found");
  })
});

//Vehicle operations

//create
router.post("/users/:userId/vehicles/add/:vehicle", (req, res) => {
  User.findByIdAndUpdate(req.params.userId, { $addToSet: {vehicles: req.params.vehicle} }, {new: true}, function(err, user){
    if (err) console.error(err)
    res.send(user ? user.vehicles : "User not found");
  })
});

//render
router.get("/users/:userId/vehicles", (req, res) => {
  User.findById(req.params.userId, function(err, user){
    if (err) console.error(err)
    res.send(user ? user.vehicles : "User not found");
  })
})

//update
router.put("/users/:userId/vehicles/edit", (req, res) => {
  const {query, update} = req.body;
  console.log(query)
    User.findOneAndUpdate({ _id: req.params.userId, vehicles: query }, { $set: {"vehicles.$" : update} }, {new: true}, function(err, user){
      if (err) console.error(err)
      res.send(user ? user.vehicles : "User not found")
    })
})

//delete 
router.delete("/users/:userId/vehicles/delete/:vehicle", (req, res) => {
  const {userId, vehicle} = req.params;
  User.findByIdAndUpdate(userId, { $pull: { vehicles: vehicle } }, {new: true}, function(err, user){
    if (err) console.error(err)
    res.send(user ? user.vehicles : "User not found")
  })
})

module.exports = router;