const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Trip = require('./models/Trip');
const test = require("./routes/api/test");
const userRoutes = require("./routes/api/users");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(console.log("Connected to MongoDB"));
const app = express();

// body-parser middleware
app.use(bodyParser.json());

// index route
app.get("/", (req, res) => res.send("Welcome"))

// Use api routes
app.use("/api/test", test);
app.use("/api/users", userRoutes);

const listener = app.listen(process.env.PORT || 5500, () => {
    console.log('app is listening on port ' + listener.address().port)
  });