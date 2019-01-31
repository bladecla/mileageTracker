const express = require('express'),
      User = require('./../../models/User'),
      Trip = require('./../../models/Trip'),
      checkAuth = require('./../../auth/check-auth'),
      router = express.Router();

const callback = res => {
    return (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).json({status: 500});
        }
        if (!data) return res.json({status: 404});
        res.send(data)
    }
}

router.route('/')
    .get(checkAuth, (req, res) => User.getTrips(req.user._id, callback(res)))
    .post(checkAuth, (req, res) => User.addTrip(req.user._id, new Trip(req.body), callback(res)))
    .put(checkAuth, (req, res) => User.updateTrip(new Trip(req.body), callback(res)))
    
router.delete('/:_id', checkAuth, (req, res) => User.deleteTrip(req.params._id, callback(res)))

router.route('/batch')
    .put(checkAuth,
        (req, res, next) => {
            const {updates, isVehicleNew} = req.body
            if (updates.vehicle && isVehicleNew === true) {
                User.addVehicle(req.user._id, updates.vehicle, (err, data) => {
                    if (err) {
                        console.error(err)
                        return res.json({status: 500})
                    }
                    if (!data) return res.json({status: 404})
                    next()
                })
            }
            else next()
        },
        (req, res) => User.batchUpdateTrips(req.user._id, req.body.tripIds, req.body.updates, callback(res)))
    .post(checkAuth, (req, res) => User.batchDeleteTrips(req.user._id, req.body.tripIds, callback(res)))

module.exports = router;