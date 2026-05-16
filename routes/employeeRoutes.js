//Importera express, employeeModel och authenticationToken
const express = require("express");
const Reservation = require("../models/employee.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");

const route = express.Router();


//Get route, hämta alla reservationer
route.get("/", authenticationToken, async (req, res) => {
 
    try {

    } catch (error) {
    }
})

//Get route, hämta specifik reservation
route.get("/:id", authenticationToken, async (req, res) => {

    try {

    } catch (error) {
    }
})

//Post route, skapa reservation (t ex. om mottagen bokning via telefon)
route.post("/", authenticationToken, async (req, res) => {

    try {

    } catch (error) {
    }
})

//Put route, ändra i reservation
route.put("/:id", authenticationToken, async (req, res) => {

    try {

    } catch (error) {
    }
})

//Delete route, ta bort en reservation
route.delete("/:id", authenticationToken, async (req, res) => {

    try {

    } catch (error) {
    }
})

module.exports = route;