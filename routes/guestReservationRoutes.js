//Importera express och Reservation
const express = require("express");
const Reservation = require("../models/reservation.model.js");

const route = express.Router();


//Get route, hämta sin bokning
route.get("/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const result = await Reservation.findById(id);

        if (!result) { return res.status(404).json({ message: "Kunde inte hitta bokning med matchande ID" }) };
        res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})

//Post route, göra en bokning
route.post("/", async (req, res) => {

    try {

        const result = await Reservation.create(req.body);
        res.status(200).json(result);

    } catch (error) {

        //Om required-fält är tomma blir det validationError
        if (error.name === "ValidationError") {

            const errorArray = Object.values(error.errors); //Array med errors
            const errorMessage = errorArray.map(err => (err.message));  //Hittar message bland errors
            console.log(errorMessage);

            return res.status(400).json({ message: errorMessage });
        }

        return res.status(500).json({ message: "Server error" });
    }
})

module.exports = route;