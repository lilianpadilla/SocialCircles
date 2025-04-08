const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const queries = require('../database/queries');

// sql query to get the username and totalscore and sort them by desc
router.get('/', function(req, res, next) {
  let sql = `
    SELECT u.username, l.totalScore
    FROM Leaderboard l JOIN Users u 
      ON u.userId = l.userId
    ORDER BY l.totalScore DESC
    LIMIT 9;
  `; //store in query file

  // validation
  db.query(sql, (err, result) => {
    if (err) throw err;

    // we're making an array of leaderboard entries from the database
    // it'll map the entries to the index so we can find their rank easily
    const leaderboard = result.map((entry, index) => {
      let icon = null;
      if (index === 0) icon = '👑';
      else if (index === 1) icon = '🥈';
      else if (index === 2) icon = '🥉';

      return {
        rank: index + 1,
        name: entry.username,
        score: entry.totalScore,
        icon // placeholder medals
      };
    });

    res.render('leaderboard', { leaderboard });
  });
});

module.exports = router;