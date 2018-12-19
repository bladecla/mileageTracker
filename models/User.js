const mongoose = require('mongoose');
const tripSchema = require('./Trip').schema;
const Schema = mongoose.Schema;
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

module.exports.findByEmail = function(email, done){
  User.findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, {404: "User Not Found"});
    done(null, user);
  })
}