const express = require('express');
const router = express.Router();
const db = require('../database/connection'); 

router.get("/", (req, res) => {
    const sql = "SELECT CharacterName, personality FROM Characters"; 

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Error retrieving character data.");
        }


        res.render('descriptions', { title: 'Character Descriptions', characters: results });
    });
});

module.exports = router;
