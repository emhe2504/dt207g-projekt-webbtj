const mongoose = require("mongoose");

//reservation Schema
const reservationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Ange email"],
        lowercase: true
    },
    phonenumber: {
        type: String,
        required: [true, "Ange telefonnummer"]
    },
    date: {
        type: Date,
        required: [true, "Ange datum"]
    },
    time: {
        type: String,
        required: [true, "Ange tid"]
    },
    people: {
        type: Number,
        required: [true, "Ange antal personer"]
    },
    comment: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now()
    },
});


//Inkludera Schema till databas
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;