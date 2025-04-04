const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');

router.get('/', (req, res) => res.render('login'));

router.post('/', (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM Users WHERE username = ?`;
    
    //validation
    db.query(sql, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('User not found.');
        }

        const isMatch = await bcrypt.compare(password, results[0].userPass);
        if (!isMatch) {
            return res.status(401).send('Incorrect password.');
        }

        req.session.user = { userID: results[0].userID, username: results[0].username };
        res.redirect('/');
    });
});

module.exports = router;
