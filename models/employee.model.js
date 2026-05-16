const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//employee Schema
const employeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Ange email"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Ange lösenord"]
    },
    created: {
        type: Date,
        default: Date.now()
    },
});


//Hashing
employeeSchema.pre("save", async function () {     //Innan vi sparar i databasen, hash först

    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);    //om ny användare/ändrat lösen, hash lösen, bearbetas 10 salt rounds
            this.password = hashedPassword;     //orginal-lösen blir hashedPassword
        }
    } catch (error) {
        throw error;
    }
});

//Registrera ny anställd
employeeSchema.statics.register = async function (email, password) {

    try {
        const employee = new this({ email, password });     //Bygger nytt anställd-konto
        await employee.save();        //Spara i mongoDB
        return employee;
    } catch (error) {
        throw error;
    }
};

//Jämföra hashed lösen med inmatat lösen
employeeSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

//Logga in användare
employeeSchema.statics.login = async function (email, password) {
    try {
        const employee = await this.findOne({ email });     //letar efter email i databasen

        //Om email inte finns
        if (!employee) {
            throw new Error("Incorrect email");
        }

        const passwordMatch = await employee.comparePassword(password);      //Kontrollera lösen

        //Om lösen inte matchar
        if (!passwordMatch) {
            throw new Error("Incorrect password");
        }

        //Om inloggning är korrekt och input stämmer
        return employee;

    } catch (error) {
        throw error;
    }
}

//Inkludera Schema till databas
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;