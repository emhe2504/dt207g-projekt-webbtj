//Importera express, menu och 
const express = require("express");
const Menu = require("../models/menu.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");

const route = express.Router();


//Get route, hämta meny
route.get("/:id", async (req, res) => {

    try {

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})


//Post route, lägga till i meny
route.post("/", async (req, res) => {

    try {

    } catch (error) {

        return res.status(500).json( { message: "Server error" } );
    }
})


//Put route, ändra måltid i meny
route.put("/", async (req, res) => {

    try {

    } catch (error) {

        return res.status(500).json( { message: "Server error" } );
    }
})


//Delete route, radera måltid i meny
route.post("/", async (req, res) => {

    try {

    } catch (error) {

        return res.status(500).json( { message: "Server error" } );
    }
})

module.exports = route;