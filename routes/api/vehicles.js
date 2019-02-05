const express = require('express');
const User = require('./../../models/User');
const checkAuth = require('./../../auth/check-auth');
const router = express.Router();

const callback = res => (err, vehicles) => {
  if (err) {
    console.error(err);
    return res.status(500).json({status: 500})
  }
  if (!vehicles) return res.json({status: 404});
  res.send(vehicles);
}

router.route("/")
  .get(checkAuth, (req, res) => User.getVehicles(req.user._id, callback(res)))
  .post(checkAuth, (req, res) => User.addVehicle(req.user._id, req.body.vehicle, callback(res)))
  .put(checkAuth, (req, res) => User.updateVehicle(req.user._id, req.body.vehicle, req.body.newVehicle, callback(res)))
router.delete("/:vehicle", checkAuth, (req, res) => User.deleteVehicle(req.user._id, req.params.vehicle, callback(res)))

module.exports = router;