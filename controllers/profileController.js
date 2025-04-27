const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const queries = require('../database/queries');

const getProfile = (req, res) => {
    const userID = req.session.user.userID; // get logged-in user's ID

    db.query(queries.getUserStats, [userID, userID, userID], (err, results) => {
        if (err) {
            console.error('Error fetching profile stats:', err);
            return res.status(500).send('Error loading profile.');
        }

        const stats = results[0]; // First (and only) row
        
        // added this to check nulls

        if (stats.averageScore === null || isNaN(stats.averageScore)) {
            stats.averageScore = 0;
        } else {
            stats.averageScore = parseFloat(stats.averageScore); // used chat for this line bc it kept giving me errors
        }                                                        // it basically converts averageScore from string to a float

        // Also fix gamesPlayed if needed
        if (stats.gamesPlayed === null || isNaN(stats.gamesPlayed)) {
            stats.gamesPlayed = 0;
        }
        
        res.render('profile', { title: 'Profile', stats: stats, username: req.session.user.username});
    });
};

module.exports = { getProfile };
