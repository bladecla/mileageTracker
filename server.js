const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// body-parser middleware
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World"))

const listener = app.listen(process.env.PORT || 5500, () => {
    console.log('app is listening on port ' + listener.address().port)
  });