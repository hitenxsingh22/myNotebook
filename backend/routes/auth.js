const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "secureee";

// Validation rules for user registration
const userValidationRules = () => {
    return [
        body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('email').isEmail().withMessage('Email must be a valid email address'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
    ];
};

// ROUTE 1: Create user with POST "/api/auth/createuser"
router.post('/createuser', userValidationRules(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation Errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        console.log('Request Body:', req.body);

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new User instance with the hashed password
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save user to database
        await user.save();

        // Prepare JWT payload
        const data = {
            user: {
                id: user.id
            }
        };

        // Generate JWT
        const authToken = jwt.sign(data, JWT_SECRET);

        // Send response with JWT
        res.status(201).json({ authToken });
    } catch (error) {
        if (error.code === 11000) {
            console.error('Duplicate Key Error:', error.message);
            return res.status(400).json({ message: 'Email is already in use. Please use a different email address.' });
        }
        console.error('Error:', error.message);
        res.status(400).send({ message: error.message });
    }
});

// ROUTE 2: Authenticate user with POST "/api/auth/login"
router.post('/login', [
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').exists().withMessage('Password cannot be blank')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation Errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        // Prepare JWT payload
        const data = {
            user: {
                id: user.id
            }
        };

        // Generate JWT
        const authToken = jwt.sign(data, JWT_SECRET);

        // Send response with JWT
        res.json({ authToken });
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Get logged-in User Details using POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
         userID = req.user.id; // Use the user ID from the token
        const user = await User.findById(userID).select("-password");
        res.send(user)
      
      
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
