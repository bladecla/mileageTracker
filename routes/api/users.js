const express = require('express');
const User = require('./../../models/User');

const router = express.Router();

router.route('/')
    .post((req, res) => {
        User.findByEmail(req.body.email, (err, user) => {
            if (err) return console.error(err);
            let userData = {name: user.name, email: user.email, ...user.data.toObject()}
            res.json(userData);
            console.log(userData)
        })
    })

router.route('/register')
    .post((req, res) => {
        User.register(req.body.name, req.body.email, req.body.password, (err, message) => {
            if (err) return console.error(err);
            res.json(message);
        })
    })
module.exports = router;