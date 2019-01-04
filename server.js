const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/User');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
  const listener = app.listen(process.env.PORT || 5500, () => {
    console.log('app is listening on port ' + listener.address().port)
  });
})

// middleware
app.use(bodyParser.json());
app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());

// passport configuration
require('./auth/config')(passport, require('passport-local').Strategy, User);

// index route
app.get("/", (req, res) => res.send("Welcome"))

// Use api routes
app.use("/api/test", require("./routes/api/test"));
app.use("/api/users", require("./routes/api/users")(passport, User));
app.use("/api/trips", require("./routes/api/trips"));
app.use("/api/vehicles", require("./routes/api/vehicles"));

