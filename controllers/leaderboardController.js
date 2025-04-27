const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const queries = require('../database/queries');


// sql query to get the username and totalscore and sort them by desc
const getLeaderboard = ((req, res, next) => { // we have a request from the user to see the leaderboard
    // validation
    db.query(queries.leaderboardResults, (err, result) => {
      if (err) throw err;
  
      // we're making an array of leaderboard entries from the database
      // it'll map the entries to the index so we can find their rank easily
      const leaderboard = result.map((entry, index) => { // maybe turn this into a function
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

  // credit to chatgpt for getMiniLeaderboard
  // struggled with getting the first 3 leaderboard results on game page,
  // so this was a quick solution, but could probably be redone

  const getMiniLeaderboard = (limit, callback) => {
    db.query(queries.miniLeaderboard, (err, result) => {
      if (err) return callback(err);
  
      const miniLeaderboard = result.map((entry, index) => {
        let icon = null;
        if (index === 0) icon = '👑';
        else if (index === 1) icon = '🥈';
        else if (index === 2) icon = '🥉';
        return {
          rank: index + 1,
          name: entry.username,
          score: entry.totalScore,
          icon
        };
      });
  
      callback(null, miniLeaderboard);
    });
  };


  module.exports = {
    getLeaderboard,
    getMiniLeaderboard
  };