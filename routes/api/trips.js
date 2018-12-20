const express = require('express');
const User = require('./../../models/User');
const Trip = require('./../../models/Trip');
const router = express.Router();

router.get('/', (req, res) => res.send("Hello"))

module.exports = router;