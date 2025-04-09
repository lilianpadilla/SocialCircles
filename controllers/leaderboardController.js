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




  // need to redo, figure out how to send to game and leaderboard

  const getMiniLeaderboard = (limit = 3, callback) => {
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
  
      callback(null, miniLeaderboard); //this line is AI-generated usually callback (err, res), but in this case there is no errors and the result is the mini leaderboard
    });
  };


  module.exports = {
    getLeaderboard,
    getMiniLeaderboard
  };