//Importera express, Employee, authenticationToken och jwt
const express = require("express");
const Employee = require("../models/Employee.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");
const jwt = require("jsonwebtoken");

const route = express.Router();


//GET - hämta alla anställda
route.get("/", authenticationToken, async (req, res) => {
    try {
        let result = await Employee.find({}, { password: 0 });  //För säkerhet, visa inte lösen
        res.json(result);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})


//GET - hämta anställd med specifikt id
route.get("/:id", authenticationToken, async (req, res) => {
    try {

        const ID = req.params.id;

        let result = await Employee.findById(ID, { password: 0 });

        if (!result) { return res.status(500).json({ message: "Could not find employee with matching ID" }) }
        return res.json(result);

    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});


//PUT - redigera anställd med specifikt id
route.put("/:id", authenticationToken, async (req, res) => {

    try {
        const id = req.params.id;
        const newData = req.body;

        //Där id = req.params.id, sätt in den nya req.body (validering - required)
        let result = await Employee.updateOne({ _id: id }, { $set: newData }, { runValidators: true });

        if (result.modifiedCount > 0) {
            return res.json({ message: "Korrigeringar sparade i anställd " });
        } else {
            return res.json({ message: "Inga korrigeringar kunde göras " });
        }


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


//POST - registrera ny anställd
route.post("/register", async (req, res) => {

    const errors = [];

    try {
        const { email, password } = req.body;

        //Validera input
        if (!email) {
            errors.push("Ange epost-adress");
            return res.status(400).json({ errors })
        };

        if (!password) {
            errors.push("Ange lösenord");
            return res.status(400).json({ errors })
        };

        const registeredEmployee = new Employee({ email, password });
        await registeredEmployee.save();
        res.status(201).json({ message: "Anställd skapad" });


    } catch (error) {

        if (error.code === 11000) {
            errors.push("Email-adressen är upptagen")
            console.log(errors)
            return res.status(500).json({ message: errors })
        }

        res.status(500).json({ message: "Server error" });
    }
})


//POST - logga in anställd
route.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        let registeredEmployee = await Employee.findOne({ email: email }); //Hämta anställd med email

        //Om anställd inte finns registrerad
        if (!registeredEmployee) {
            return res.status(401).json({ message: "Angiven e-postadress är ej korrekt" });
        }

        const correctPassword = await registeredEmployee.comparePassword(password); //Jämföra registrerat lösen med angivet lösen

        //om angivet lösen inte är korrekt
        if (!correctPassword) {
            return res.status(401).json({ message: "Angivet lösenord är ej korrekt" });
        }

        //Skapa jwt-token
        const payload = { email: email, id: registeredEmployee._id };  //Payload läggs in i token
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" }); //Hemlig nyckel används för att skapa signatur

        //Hämta anställd igen, utan lösenord

        registeredEmployee = await Employee.findOne({ email: email }, { password: 0 });

        const response = {
            registeredEmployee,
            token
        }

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json(error);
    }
})

//DELETE - radera anställd med specifikt id
route.delete("/:id", authenticationToken, async (req, res) => {

    try {
        const id = req.params.id;
        let result = await Employee.deleteOne({ _id: id });     //Radera anställd där id = req.params.id

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Could not delete employee, no matching id" });    //om inget raderades
        }

        return res.json({ message: "Employee with id: " + req.params.id + " deleted" });    //om radering lyckats

    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = route;