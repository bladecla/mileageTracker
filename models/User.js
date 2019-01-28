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


// local authentication strategy

module.exports.localAuth = (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    if (!bcrypt.compareSync(password, user.password)) return done(null, false);
    done(null, user);
  })
};

// user operations

module.exports.findByEmail = (email, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, {status: 404});
    done(null, user);
  })
}

module.exports.register = (name, email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (user) return done(new Error('User already exists.'));
    if (!user) user = new User({name, email, password: bcrypt.hashSync(password, 12)});
    user.save(error => {
      if (error) return done(error);
      done(null, {success: true})
    })
  })
}

module.exports.changePassword = ( _id, newPassword, done ) => {
  User.findByIdAndUpdate( _id, 
    { $set: { password: bcrypt.hashSync(newPassword, 12) } }, 
    (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      done(null, {success: true})
    })
}

module.exports.changeEmail = ( _id, newEmail, done ) => {
  User.findByIdAndUpdate( _id, 
    { $set: { email: newEmail } }, {new: true}, 
    (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      done(null, { email: user.email })
    })
}

module.exports.changeName = ( _id, newName, done ) => {
  User.findByIdAndUpdate( _id, 
    { $set: { name: newName } }, {new: true}, 
    (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      done(null, { name: user.name })
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
    const {totalMileage, businessMiles, businessTrips} = user.data;
    return done(null, {trip, totalMileage, businessMiles, businessTrips});
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
      const {totalMileage, businessMiles, businessTrips} = updatedUser.data;
      return done(null, {_id: tripId, totalMileage, businessMiles, businessTrips});
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

module.exports.batchUpdateTrips = (_id, tripIds, updateValues, done) => {
  tripIds = tripIds.map(id => mongoose.Types.ObjectId(id));
  const updates = {};
  for (const field in updateValues) {
    updates["data.trips.$[trip]." + field] = updateValues[field];
  }
  User.findByIdAndUpdate(_id, 
    { $set: updates }, 
    { arrayFilters: [{"trip._id": {$in: tripIds} }], multi: true, new: true },
    (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, { trips: tripIds.map(id => user.data.trips.id(id)) })
    })
}

module.exports.batchDeleteTrips = (_id, tripIds, done) => {
  User.findById(_id, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    var set = {
      "data.totalMileage": 0,
      "data.businessMiles": 0,
      "data.businessTrips": 0
    }
    tripIds.forEach(id => {
      const trip = user.data.trips.id(id);
      if (!trip.end) return done(null, false);
      const dist = trip.end - trip.start;
      set["data.totalMileage"] -= dist;
      if (trip.isBusiness){
        set["data.businessMiles"] -= dist;
        set["data.businessTrips"]--;
      }
    });
    tripIds = tripIds.map(id => mongoose.Types.ObjectId(id));
    User.findByIdAndUpdate(_id,
      { $pull: { "data.trips": { _id: {$in: tripIds} } },
        $inc: set },
      { multi: true, new: true }, 
      (error, updatedUser) => {
        if (error) return done(error);
        if (!updatedUser) return done(null, false);
        const { totalMileage, businessMiles, businessTrips } = updatedUser.data;
        return done(null, { trips: tripIds, totalMileage, businessMiles, businessTrips })
      })
  })
}

// vehicle operations

module.exports.addVehicle = (_id, vehicle, done) => {
  if (!vehicle) return done(console.log("Invalid string"), false)
  User.findByIdAndUpdate(_id, { $addToSet: { "data.vehicles": vehicle } }, {new: true}, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    return done(null, {vehicle})
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
  User.findOneAndUpdate({_id: _id, "data.vehicles": vehicle}, 
    { $set: { "data.vehicles.$": newVehicle, "data.trips.$[trip].vehicle": newVehicle }},
    { arrayFilters: [ { "trip.vehicle": vehicle } ], multi: true, new: true }, 
    (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, {vehicle})
    })
}

module.exports.deleteVehicle = (_id, vehicle, done) => {
  User.findOneAndUpdate({ _id: _id, "data.trips.vehicle": vehicle }, 
    { $pull: { "data.vehicles": vehicle }, 
      $unset: { "data.trips.$[trip].vehicle": "" } }, 
      { arrayFilters: [ { "trip.vehicle": vehicle } ], multi: true, new: true }, 
      (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, {vehicle})
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