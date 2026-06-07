//Importera express, Reservation och authenticationToken
const express = require("express");
const Reservation = require("../models/reservation.model.js");
const authenticationtoken = require("../middleware/authenticationToken.js");

const route = express.Router();


//Get route, hämta alla reservationer
route.get("/", authenticationtoken, async (req, res) => {

    try {

        const result = await Reservation.find({});
        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})


//Get route, hämta specifik reservation
route.get("/:id", authenticationtoken, async (req, res) => {

    try {
        const id = req.params.id;
        const result = await Reservation.findById(id);

        if (!result) { return res.status(404).json({ message: "Kunde inte hitta bokning med matchande ID" }) };
        res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})


//Post route, skapa reservation (t ex. om mottagen bokning via telefon)
route.post("/", authenticationtoken, async (req, res) => {

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


//Put route, ändra i reservation
route.put("/:id", authenticationtoken, async (req, res) => {

    try {

        const id = req.params.id;
        const dataToAdd = req.body;

        const result = await Reservation.findOneAndUpdate({ _id: id }, { $set: dataToAdd }, { runValidators: true });
        res.json(result);

    } catch (error) {

        //Om required-fält är tomma blir det validationError (runValidators)
        if (error.name === "ValidationError") {

            const errorArray = Object.values(error.errors); //Array med errors
            const errorMessage = errorArray.map(err => (err.message));  //Hittar message bland errors
            console.log(errorMessage);

            return res.status(400).json({ message: errorMessage });
        }

        return res.status(500).json({ message: "Server error" });
    }
})


//Delete route, ta bort en reservation
route.delete("/:id", authenticationtoken, async (req, res) => {

    try {

        const id = req.params.id;
        const result = await Reservation.deleteOne({ _id: id });

        //404, not found
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Could not find and delete reservation with id :" + id })
        } else {
            res.json({ message: "Deleted reservation with id :" + id });
        }

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})

module.exports = route;