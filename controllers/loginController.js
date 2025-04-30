const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');

const userLogin = (req, res) => {
    const { username, password, userrole } = req.body;

    db.query(queries.login, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.render('login', { loginFailed: true, errorMessage: 'User not found.' });
        }

        const user = results[0];

        if (user.status !== 'Active') {
            return res.render('login', { loginFailed: true, errorMessage: 'Your account has been banned.' });
        }    // not using send becuase we want it to actually go back to login when they have an incorrect login

        const isMatch = await bcrypt.compare(password, user.userPass);
        if (!isMatch) {
            return res.render('login', { loginFailed: true, errorMessage: 'Incorrect password.' });
        }

        const dbRole = user.UserRole;
        console.log("Database role:", dbRole, "User selected:", userrole);

        if (dbRole.toLowerCase() !== userrole.toLowerCase()) {
            return res.render('login', { loginFailed: true, errorMessage: 'Role mismatch. Please login correctly.' });
        }

        req.session.user = {
            userID: user.userID,
            username: user.username,
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