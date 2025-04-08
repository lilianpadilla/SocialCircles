const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');

router.get('/', (req, res) => res.render('register'));

router.post('/', async (req, res) => {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

 //   const sql = `INSERT INTO Users (username, userPass, email, UserRole) VALUES (?, ?, ?, 'Account')`; //store in query file
    //validation
    db.query(queries.register, [username, hashedPassword, email], (err) => {
        if (err) {
            console.error('Error registering:', err);
            return res.status(500).send('Error registering.'); // need to add a pop up saying the email/username is already used
        }
        res.redirect('/login');
    });
});

module.exports = router;
