const express = require('express');
const User = require('./../../models/User');
const Trip = require('./../../models/Trip');
const checkAuth = require('./../../auth/check-auth');
const router = express.Router();

const callback = res => {
    return (err, data) => {
        if (err) return res.send(console.error(err));
        if (!data) return res.json({success: false});
        res.send(data)
    }
}

router.route('/')
    .get(checkAuth, (req, res) => User.getTrips(req.user._id, callback(res)))
    .post(checkAuth, (req, res) => User.addTrip(req.user._id, new Trip(req.body), callback(res)))
    .put(checkAuth, (req, res) => User.updateTrip(new Trip(req.body), callback(res)))
    .delete(checkAuth, (req, res) => User.deleteTrip(req.body._id, callback(res)))

module.exports = router;