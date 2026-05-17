const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//reservation Schema
const reservationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Ange email"],
        lowercase: true,
        unique: true
    },
    phonenumber: {
        type: String,
        required: [true, "Ange telefonnummer"]
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