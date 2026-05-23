const mongoose = require("mongoose");

//reservation Schema
const menuSchema = new mongoose.Schema({
    mealname: {
        type: String,
        required: [true, "Ange måltidsnamn"]
    },
    mealdescription: {
        type: String,
        required: [true, "Ange måltidsbeskrivning"]
    },
    mealprice: {
        type: String,
        required: [true, "Ange måltidspris"]
    },
    mealType: {
        type: String,
        required: [true, "Ange måltidstyp"]
    }
});


//Inkludera Schema till databas
const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;