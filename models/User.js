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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    totalMileage: {
        type: Number,
        min: 0,
        default: 0
    },
    trips: [tripSchema],
    vehicles: [String]
});

module.exports = User = mongoose.model('User', userSchema);