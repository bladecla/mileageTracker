const express = require('express');
const router = express.Router();
const checkAuth = require('./../../auth/check-auth');

module.exports = function(passport, User){
    router.route('/')
        .post((req, res) => {
            User.getData(req.user._id, (err, userData) => {
                if (err) return console.error(err);
                if (userData) res.json(userData);
                console.log(userData)
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

    router.post("/login", passport.authenticate('local'), (req, res) => res.send(req.user.name + " is now logged in."));

    router.get("/logout", (req, res) => {
        console.log("logging out " + req.user.name)
        req.logout();
        res.send("You are logged out");
      })
    
    router.get("/profile", checkAuth, (req, res) => {
        res.send("Welcome, " + req.user.name)
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