const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');

router.get('/', (req, res) => res.render('register'));

router.post('/', async (req, res) => {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO Users (username, userPass, email, UserRole) VALUES (?, ?, ?, 'Account')`;
    //validation
    db.query(sql, [username, hashedPassword, email], (err) => {
        if (err) {
            console.error('Error registering:', err);
            return res.status(500).send('Error registering.');
        }
        res.redirect('/login');
    });
});

module.exports = router;
