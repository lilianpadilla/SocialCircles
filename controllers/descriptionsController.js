const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const queries = require('../database/queries');

const getDescriptions =  ((req, res) => {
    db.query(queries.descriptions, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Error retrieving character data.");
        }


        res.render('descriptions', { title: 'Character Descriptions', characters: results });
    });
});

module.exports = {getDescriptions};