const express = require('express');
const router = express.Router();
const checkAuth = require('./../../auth/check-auth');

const userDataCB = res => (err, userData) => {
    if (err) {
        res.json({status: 500})
        return console.error(err);
    }
    if (userData) res.json({user: userData});
        else res.json({status: 404});
}

module.exports = function(passport, User){

    // authentication routes

    router.route('/')
        .get(checkAuth, (req, res) => res.json({success: true}))

    router.post('/register', (req, res, next) => {
        User.register(req.body.name, req.body.email, req.body.password, (err, result) => {
            if (err) {
                res.json({status: 401})
                return console.error(err);
            }
            if (result.success) next();
        })
    }, passport.authenticate('local'), (req, res) => User.getData(req.user._id, userDataCB(res)));

    router.post("/login", passport.authenticate('local'), (req, res) => User.getData(req.user._id, userDataCB(res)));

    router.get("/logout", (req, res) => {
        console.log("logging out " + req.user.name)
        req.logout();
        res.send({success: true});
      })

    // profile update routes

    router.put("/change-password", checkAuth, passport.authenticate('local'), (req, res) => {
        User.changePassword(req.user._id, req.body.newPassword, (err, result) => {
            if (err) {
                res.json({status: 500});
                return console.error(err);
            }
            if (result.success) return res.json(result);
            res.json({status: 404});
        })
    })
    
    router.put("/change-email", checkAuth, passport.authenticate('local'), (req, res) => {
        User.changeEmail(req.user._id, req.body.newEmail, (err, result) => {
            if (err) {
                res.json({status: 500});
                return console.error(err);
            }
            if (result) return res.json(result);
            res.json({status: 404});
        })
    })

    router.get("/reset", checkAuth, (req, res) => {
        User.reset(req.user._id, (err, userData) => {
            if (err) return console.error(err);
            if (!userData) return res.json("No user data")
            res.json(userData);
        })
    })

    return router;
}