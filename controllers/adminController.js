const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const queries = require('../database/queries');

const banUser = (req, res) => {
    const { username } = req.body; 
    db.query(queries.banUser, [username], (err) => {
        if (err) return res.status(500).send('Failed to ban user.');
        res.redirect('/admin'); 
    });
};

// const resetScore = (req, res) => {
//     const { username } = req.body; 
//     db.query(queries.resetScore, [username], (err) => {
//         if (err) return res.status(500).send('Failed to reset user score.');
//         res.redirect('/admin');
//     });
// };

const updateUserToAdmin = (req, res) => {
    const { username } = req.body; 
    db.query(queries.updateUserToAdmin, [username], (err) => {
        if (err) return res.status(500).send('Failed to promote user.');
        res.redirect('/admin');
    });
};

module.exports = {
    banUser,
    // resetScore,
    updateUserToAdmin
};