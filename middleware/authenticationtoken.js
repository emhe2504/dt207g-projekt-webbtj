const jwt = require("jsonwebtoken");


//Middleware som kontrollerar giltig JWT
function authenticateToken(req, res, next) {    //Next "nu kan du köra resten av anropet"

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];   //Ta bort bearer och mellanslag

    if (!token) return res.status(401).json( { message: "Access denied - no token provided" } );

    jwt.verify(token, process.env.JWT_KEY, (err, employee) => {
        if (err) return res.status(403).json("Incorrect token");

        req.employee = employee;
        next();
    });
}

module.exports = authenticateToken;