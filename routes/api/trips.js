const express = require('express');
const User = require('./../../models/User');
const Trip = require('./../../models/Trip');
const checkAuth = require('./../../auth/check-auth');
const router = express.Router();

router.get('/', checkAuth, (req, res) => res.send("Hello"))

module.exports = router;