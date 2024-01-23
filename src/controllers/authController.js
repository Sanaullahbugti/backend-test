const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.signup = async (req, res) =>
{
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }

    try
    {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser)
        {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) =>
{
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }

    try
    {
        // Check if the email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user)
        {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid)
        {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({token});
    } catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};
