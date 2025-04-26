const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');

const userLogin = (req, res) => {
    const { username, password, userrole } = req.body;

    db.query(queries.login, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('User not found.');
        }

        const isMatch = await bcrypt.compare(password, results[0].userPass);
        if (!isMatch) {
            return res.status(401).send('Incorrect password.');
        }

        const dbRole = results[0].UserRole; 
        console.log("Database role:", dbRole, "User selected:", userrole);

        if (dbRole.toLowerCase() !== userrole.toLowerCase()) {
            return res.status(403).send('Role mismatch. Please login correctly.');
        }

        req.session.user = {
            userID: results[0].userID,
            username: results[0].username,
            role: dbRole
        };

         
         if (dbRole.toLowerCase() === 'admin') {
            return res.redirect('/admin'); 
        } else {
            return res.redirect('/');
        }
    });
};
  
module.exports = {userLogin}