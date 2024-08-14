const jwt = require('jsonwebtoken');
const JWT_SECRET = "secureee";


const fetchuser = (req, res, next) => {
    // Get the token from the header
    const token = req.header('auth-token');

    // Check if token is not provided
    if (!token) {
     res.status(401).send({ error: "Authenticate using a valid token" });
    }

    try {
        // Verify the token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; // Add user data to request object
        next(); // Continue to the next middleware or route handler
    } catch (error) {
         res.status(401).send({ error: "Authenticate using a valid token" });
    }
};

module.exports = fetchuser;
