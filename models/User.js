const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const tripSchema = require('./Trip').schema;
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
      console.log("authentication successful");
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


module.exports.getData = (_id, done) => {
  User.findById(_id, (err, user) => {
    if (err) return done(err);
    if (!user.data) return done(null, false);
    let userData = {name: user.name, email: user.email, ...user.data.toObject()}
    return done(null, userData);
  })
}

module.exports.getTrips = (_id, done) => {
  User.findById(_id, (err, user) => {
    if (err) return done(err);
    if (!user.data) return done(null, false);
    return done(null, user.data.trips)
  })
}

module.exports.addTrip = (_id, trip, done) => {
  if (!trip.end) return done(null, false);
  let dist = trip.end - trip.start;
  let changes = {
    $push: { "data.trips": trip },
    $inc: { "data.totalMileage": dist }
  }
  if (trip.isBusiness === "true") {
    changes.$inc["data.businessMiles"] = dist;
    changes.$inc["data.businessTrips"] = 1;
  }
  User.findByIdAndUpdate(_id, changes, {new: true}, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    return done(null, user.data)
  })
}

module.exports.deleteTrip = (tripId, done) => {
  User.findOneAndUpdate({"data.trips._id": tripId}, { $pull: { "data.trips": { _id: tripId } } }, {new: true}, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    return done(null, user.data.trips);
  })
}