//Importera express, guestbook och authenticationToken
const express = require("express");
const Employee = require("../models/Employee.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");
const jwt = require("jsonwebtoken");

const route = express.Router();


//GET - hämta alla anställda
route.get("/", authenticationToken, async (req, res) => {
    try {

    } catch (error) {
    }
})


//GET - hämta anställd med specifikt id
route.get("/:id", authenticationToken, async (req, res) => {
    try {

    } catch (error) {
    }
});


//PUT - redigera anställd med specifikt id
route.put("/:id", authenticationToken, async (req, res) => {

    try {

    } catch (error) {
    }
})


//POST - registrera ny anställd
route.post("/register", async (req, res) => {

    try {

    } catch (error) {
    }
})


//POST - logga in anställd
route.post("/login", async (req, res) => {

    try {

    } catch (error) {
    }
})

//DELETE - radera anställd
route.delete("/:id", authenticationToken, async (req, res) => {

    try {

    } catch (error) {
    }
})

module.exports = route;