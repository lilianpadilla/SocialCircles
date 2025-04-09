const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');

const registerUser = (async (req, res) => {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    //validation
    db.query(queries.register, [username, hashedPassword, email], (err) => {
        if (err) {
            console.error('Error registering:', err);
            return res.status(500).send('Error registering.'); // need to add a pop up saying the email/username is already used
        }
        res.redirect('/login');
    });
});

module.exports = {registerUser}