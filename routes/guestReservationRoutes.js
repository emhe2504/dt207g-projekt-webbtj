//Importera express, guestbook och authenticationToken
const express = require("express");
const Reservation = require("../models/reservation.model.js");

const route = express.Router();


//Get route, hämta sin bokning
route.get("/:id", async (req, res) => {

    try {

    } catch (error) {
    }
})

//Post route, göra en bokning
route.post("/", async (req, res) => {

    try {

    } catch (error) {
    }
})

module.exports = route;