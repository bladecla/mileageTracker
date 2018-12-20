const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Trip = require('./models/Trip');
const test = require("./routes/api/test");
const userRoutes = require("./routes/api/users");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
  const listener = app.listen(process.env.PORT || 5500, () => {
    console.log('app is listening on port ' + listener.address().port)
  });
})

// middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

// index route

app.get("/", (req, res) => res.send("Welcome"))

// Use api routes
app.use("/api/test", test);
app.use("/api/users", userRoutes);

