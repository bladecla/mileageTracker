const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const tripSchema = new Schema({
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    isBusiness: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Trip = mongoose.model("Trip", tripSchema);
