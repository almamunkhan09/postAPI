// Importing required Packages

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Importing mongoose 
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Importing local userSchema
const User = require('../models/usermodels');
const { rawListeners } = require('../models/usermodels');



// Midlleware for creating the user input to database 

async function userRegistration(req, res, next) {

    try {
        // First find if the email exists in database. If exists then send a message that the user is already registered 
        const user = await User.findOne({ email: req.body.email });
        // uncomment to see if the server is accepting request
        //console.log(req.body);
        if (user) {
            res.json({ message: 'User is already registered' });
        }
        else {
            // Creating encrypted password 
            const hashedPassWord = await bcrypt.hash(req.body.password, 12);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassWord,
            });

            await newUser.save(); // Saving the user to the database
            res.status(200).json({
                message: ' user Created succesfullly '
            });
        }
        next();
    }
    catch (err) {
        //console.log(err.message); //// to figure out if there is any error 
        res.status(400).json({ message: err.message });

    }



}

const app = express();
router.route('/').post(userRegistration);

module.exports = router;