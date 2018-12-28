const express = require('express');
const User = require('./../../models/User');
const Trip = require('./../../models/Trip');
const checkAuth = require('./../../auth/check-auth');
const router = express.Router();

router.route('/')
    .get(checkAuth, (req, res) => {
        User.getTrips(req.user._id, (err, trips) => {
            if (err) return console.error(err);
            if (trips) return res.send(trips);
            res.send("No trips found");
        })
    })
    .post(checkAuth, (req, res) => {
        User.addTrip(req.user._id, req.body, (err, data) => {
            if (err) return console.error(err);
            if (!data) return res.json({success: false})
            res.send(data);
        })
    })
    .delete(checkAuth, (req, res) => {
        User.deleteTrip(req.body._id, (err, data) => {
            if (err) return console.error(err);
            if (!data) return res.json({success: false});
            res.send(data)
        })
    })

module.exports = router;