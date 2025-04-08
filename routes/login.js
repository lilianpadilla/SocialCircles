const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');

router.get('/', (req, res) => res.render('login'));

router.post('/', (req, res) => {
    const { username, password } = req.body;

   // const sql = `SELECT * FROM Users WHERE username = ?`; //store in query file
    
    //validation
    db.query(queries.login, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('User not found.');
        }

        const isMatch = await bcrypt.compare(password, results[0].userPass);
        if (!isMatch) {
            return res.status(401).send('Incorrect password.'); // we may want to add a page or pop up that says incorrect password
        } 

        req.session.user = { userID: results[0].userID, username: results[0].username };
        res.redirect('/');
    });
});

module.exports = router;
