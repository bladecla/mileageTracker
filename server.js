const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;
const checkAuth = require('./auth/check-auth');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
  const listener = app.listen(process.env.PORT || 5500, () => {
    console.log('app is listening on port ' + listener.address().port)
  });
})

// middleware
app.use(bodyParser.json());
app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

// passport configuration
passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) console.error(err);
    done(null, user);
  })
})
passport.use(new LocalStrategy({usernameField: "email"}, User.localAuth));

// index route
app.get("/", (req, res) => res.send("Welcome"))
app.post("/test/login", passport.authenticate('local'), (req, res) => res.send(req.user.name + " is now logged in."));
app.get("/test/logout", (req, res) => {
  console.log("logging out " + req.user.name)
  req.logout();
  res.send("You are logged out");
})
app.get("/profile", checkAuth, (req, res) => {
  res.send("Welcome, " + req.user.name)
})

// Use api routes
app.use("/api/test", require("./routes/api/test"));
app.use("/api/users", require("./routes/api/users"));

