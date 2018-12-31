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
  User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!bcrypt.compareSync(password, user.password)) return done(null, false);
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

// get all user data except password

module.exports.getData = (_id, done) => {
  User.findById(_id, (err, user) => {
    if (err) return done(err);
    if (!user.data) return done(null, false);
    let userData = {name: user.name, email: user.email, ...user.data.toObject()}
    return done(null, userData);
  })
}

// Trip operations

module.exports.getTrips = (_id, done) => {
  User.findById(_id, (err, user) => {
    if (err) return done(err);
    if (!user.data) return done(null, false);
    return done(null, user.data.trips)
  })
}

module.exports.addTrip = (_id, trip, done) => {
  if (!trip.end) return done(null, false);
  if (typeof trip.date === "object") trip.date = trip.date.toJSON;
  let dist = trip.end - trip.start;
  let changes = {
    $push: { "data.trips": trip },
    $inc: { "data.totalMileage": dist }
  }
  if (trip.isBusiness) {
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
  User.findOne({"data.trips._id": tripId}, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    const trip = user.data.trips.id(tripId)
    if (!trip.end) return done(null, false);
    let dist = trip.end - trip.start;
    let changes = {
      $pull: { "data.trips": { _id: tripId } },
      $inc: { "data.totalMileage": -1 * dist }
    }
    if (trip.isBusiness) {
      changes.$inc["data.businessMiles"] = -1 * dist;
      changes.$inc["data.businessTrips"] = -1;
    }
    User.findByIdAndUpdate(user._id, changes, {new: true}, (error, updatedUser) => {
      if (error) return done(error);
      if (!updatedUser) return done(null, false);
      return done(null, updatedUser.data);
    })
  })
}

module.exports.updateTrip = (newTrip, done) => {
  User.findOne({"data.trips._id": newTrip._id}, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    const currTrip = user.data.trips.id(newTrip._id);
    if (!currTrip) return done(null, false);
    const wasBusiness = currTrip.isBusiness,
          isBusiness = newTrip.isBusiness,
          currTripDist = currTrip.end - currTrip.start,
          newTripDist = newTrip.end - newTrip.start,
          distChange = newTripDist - currTripDist;
    let businessMilesChange, businessTripsChange, updates = {};
    if (wasBusiness && isBusiness){
      businessMilesChange = distChange;
      businessTripsChange = 0;
    }
    else if (!wasBusiness && !isBusiness){
      businessMilesChange = 0;
      businessTripsChange = 0;
    }
    else if (!wasBusiness && isBusiness){
      businessMilesChange = newTripDist;
      businessTripsChange = 1;
    } 
    else {
      businessMilesChange = currTripDist * -1;
      businessTripsChange = -1;
    }
    for (const field in newTrip.toObject()){
      updates["data.trips.$." + field] = newTrip[field];
    }
    User.findOneAndUpdate({"data.trips._id": currTrip._id}, {
      $inc: {
        "data.totalMileage": distChange,
        "data.businessMiles": businessMilesChange,
        "data.businessTrips": businessTripsChange
      },
      $set: updates
    }, {new: true}, (error, updatedUser) => {
      if (error) return done(error);
      if (!updatedUser) return done(null, false);
      const {totalMileage, businessMiles, businessTrips} = updatedUser.data;
      return done(null, {trip: newTrip, totalMileage, businessMiles, businessTrips});
    })
  })
}

// vehicle operations

module.exports.addVehicle = (_id, vehicle, done) => {
  User.findByIdAndUpdate(_id, { $addToSet: { "data.vehicles": vehicle } }, {new: true}, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    return done(null, user.data.vehicles)
  })
}

module.exports.getVehicles = (_id, done) => {
  User.findById(_id, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    return done(null, user.data.vehicles)
  })
}

module.exports.updateVehicle = (_id, vehicle, newVehicle, done) => {
  User.findOneAndUpdate({_id: _id, "data.vehicles": vehicle}, { $set: { "data.vehicles.$": newVehicle }},
  {new: true}, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    return done(null, user.data.vehicles)
  })
}

module.exports.deleteVehicle = (_id, vehicle, done) => {
  User.findByIdAndUpdate(_id, { $pull: { "data.vehicles": vehicle } }, {new: true}, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    return done(null, user.data.vehicles)
  })
}

// reset user data

module.exports.reset = (_id, done) => {
  User.findByIdAndUpdate(_id, {
    $set: {
      "data.totalMileage": 0,
      "data.businessMiles": 0,
      "data.businessTrips": 0,
      "data.trips": [],
      "data.vehicles": []
    }
  }, {new: true}, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    return done(null, user.data);
  })
}