//Importera paket
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); //Läs in variabler från .env-fil

//Läsa in routes
const employeeReservationRoutes = require("./routes/employeeReservationRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const guestReservationRoutes = require("./routes/guestReservationRoutes");
const menuRoutes = require("./routes/menuRoutes");

//Express-instans
const app = express();

const port = process.env.PORT || 5000; 

//Ansluta till MongoDB
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Successfully connected to MongoDB");
}).catch((error) => {
    console.log("Not connected to MongoDB due to: " + error);
})

//Middlewares
app.use(cors());    //Tillåt cross-origin
app.use(express.json());

//Routes
app.use("/guestreservation", guestReservationRoutes);
app.use("/employeereservation", employeeReservationRoutes);
app.use("/employee", employeeRoutes);
app.use("/menu", menuRoutes);

app.listen(port, () => {
    console.log("Server is running at port: " + port)
});