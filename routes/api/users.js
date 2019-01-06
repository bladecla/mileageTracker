const express = require('express');
const router = express.Router();
const checkAuth = require('./../../auth/check-auth');

module.exports = function(passport, User){
    router.route('/')
        .post(checkAuth,(req, res) => {
            User.getData(req.user._id, (err, userData) => {
                if (err) {
                    res.json({status: 500})
                    return console.error(err);
                }
                if (userData) res.json({user: userData});
                    else res.json({status: 404});
            })
        })
        .get((req, res) => {
            User.find((err, users) => {
                if (err) return console.error(err);
                res.json(users);
            })
        })

    router.post('/register', (req, res) => {
        User.register(req.body.name, req.body.email, req.body.password, (err, result) => {
            if (err) return console.error(err);
            res.json(result);
        })
    })

    router.post("/login", passport.authenticate('local'), (req, res) => {
        User.getData(req.user._id, (err, userData) => {
            if (err) {
                res.json({status: 500})
                return console.error(err);
            }
            if (userData) res.json({user: userData});
                else res.json({status: 404});
        })
    });

    router.get("/logout", (req, res) => {
        console.log("logging out " + req.user.name)
        req.logout();
        res.send({success: true});
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