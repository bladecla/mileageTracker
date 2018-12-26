const mongoose = require('mongoose');
const tripSchema = require('./Trip').schema;
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  data: {
      totalMileage: {
      type: Number,
      min: 0,
      default: 0
    },
    businessMiles: {
      type: Number,
      min: 0,
      default: 0
    },
    businessTrips: {
      type: Number,
      min: 0,
      default: 0
    },
      trips: [tripSchema],
      vehicles: [String]
  }
});

module.exports = User = mongoose.model('User', userSchema);

module.exports.findByEmail = (email, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, {404: "User Not Found"});
    done(null, user);
  })
}

module.exports.localAuth = (email, password, done) => {
  console.log(email + " is attempting login.")
  User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!bcrypt.compareSync(password, user.password)) return done(null, false);
      console.log("authentication succesful");
      done(null, user);
  })
};

module.exports.register = (name, email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (user) return done(null, {success: false, message: "Authorization failed"});
    if (!user) user = new User({name, email, password: bcrypt.hashSync(password, 12)});
    user.save(done(null, {success: true, message: "Registration successful"}))
  })
}


module.exports.getData = (email, done) => {
  
}