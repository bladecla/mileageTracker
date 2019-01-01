const express = require('express'),
      User = require('./../../models/User'),
      Trip = require('./../../models/Trip'),
      checkAuth = require('./../../auth/check-auth'),
      router = express.Router();

const callback = res => {
    return (err, data) => {
        if (err) return res.send(console.error(err));
        if (!data) return res.json({status: 404});
        res.send(data)
    }
}

router.route('/')
    .get(checkAuth, (req, res) => User.getTrips(req.user._id, callback(res)))
    .post(checkAuth, (req, res) => User.addTrip(req.user._id, new Trip(req.body), callback(res)))
    .put(checkAuth, (req, res) => User.updateTrip(new Trip(req.body), callback(res)))
    
router.delete('/:_id', checkAuth, (req, res) => User.deleteTrip(req.params._id, callback(res)))

module.exports = router;