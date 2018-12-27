const express = require('express');
const router = express.Router();
const checkAuth = require('./../../auth/check-auth');

module.exports = function(passport, User){
    router.route('/')
        .post((req, res) => {
            User.findByEmail(req.body.email, (err, user) => {
                if (err) return console.error(err);
                let userData = {name: user.name, email: user.email, ...user.data.toObject()}
                res.json(userData);
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
   
    router.use('/trips', require('./trips'));

    return router;
}