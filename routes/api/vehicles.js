const express = require('express');
const User = require('./../../models/User');
const checkAuth = require('./../../auth/check-auth');
const router = express.Router();

const callback = (req, res) => (err, vehicles) => {
  if (err) {
    console.error(err);
    res.send("Server error")
  }
  if (!vehicles) res.json({success: false});
  res.send(vehicles);
}

router.route("/")
  .get(checkAuth, (req, res) => User.getVehicles(req.user._id, callback(res)))
  .post(checkAuth, (req, res) => User.addVehicle(req.user._id, req.body.vehicle, callback(res)))
  .put(checkAuth, (req, res) => User.updateVehicle(req.user._id, req.body.vehicle, req.body.newVehicle, callback(res)))
  .delete(checkAuth, (req, res) => User.deleteVehicle(req.user._id, req.body.vehicle))
