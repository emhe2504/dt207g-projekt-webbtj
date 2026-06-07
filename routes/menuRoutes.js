//Importera express, Menu och authenticationToken
const express = require("express");
const Menu = require("../models/menu.model.js");
const authenticationtoken = require("../middleware/authenticationtoken.js");

const route = express.Router();


//Get route, hämta hela meny
route.get("/", async (req, res) => {

    try {

        const result = await Menu.find({});
        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})


//Get route, hämta specifik måltid i meny med id
route.get("/:id", authenticationtoken, async (req, res) => {

    try {
        const id = req.params.id;
        const result = await Menu.findById(id);

        if (!result) { return res.status(404).json({ message: "Kunde inte hitta måltid med matchande ID" }) };
        res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})


//Post route, lägga till i meny
route.post("/", authenticationtoken, async (req, res) => {

    try {

        const result = await Menu.create(req.body);
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


//Put route, ändra befintlig måltid i meny med id
route.put("/:id", authenticationtoken, async (req, res) => {

    try {

        const id = req.params.id;
        const dataToAdd = req.body;

        const result = await Menu.findOneAndUpdate({ _id: id }, { $set: dataToAdd }, { runValidators: true });

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


//Delete route, radera måltid i meny
route.delete("/:id", authenticationtoken, async (req, res) => {

    try {

        const id = req.params.id;
        const result = await Menu.deleteOne({ _id: id });

        //404, not found
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Could not find and delete meal with id :" + id })
        } else {
            res.json({ message: "Deleted meal with id :" + id });
        }

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})

module.exports = route;