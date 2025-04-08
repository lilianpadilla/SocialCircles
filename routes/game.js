const express = require('express');
const router = express.Router();
const db = require('../database/connection');

function shuffleArray(array) {
  /*
  input: an array
  output: a shuffled array with the same elements (using Durstenfeld shuffle algorithm)
  */
  for (var i = array.length - 1; i > 0;i--){
    var j = Math.floor(Math.random()*(i+1));
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array
}

function shuffleCircles(characterList) {
    /*
  input: list of shuffled characters
  output: 3 arrays (aka the social circles) each having 3 characters after shuffled 
  */
  const shuffled = shuffleArray(characterList);
  return [shuffled.slice(0, 3), shuffled.slice(3, 6), shuffled.slice(6, 9)];
}


let currentSession = {
  // initializes a session with default score 0 and empty circles array
  score: 0,
  circles: []
};

// GET /game 
router.get('/', (req, res) => { 
  db.query('SELECT * FROM Characters', (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send("Failed to load characters");
    }

    const characters = results.map(row => ({
      name: row.CharacterName,
      preferences: {
        compliment: row.compliment,
        help: row.help,
        invite: row.invite
      }
    }));

    const socialCircles = shuffleCircles(characters);

    currentSession = {
      circles: socialCircles,
      score: 0
    }; 

    res.render('game', {
      title: 'Social Circles',
      socialCircles,
      score: currentSession.score
    });
  });
});

// POST /game/action
router.post('/action', (req, res) => {
  const {actionType, circleIndex} = req.body;
  const selectedCircle = currentSession.circles[circleIndex];
  let happinessChange = 0;

  selectedCircle.forEach(char => {
    const pref = char.preferences?.[actionType];
    if (typeof pref === 'number') {
      happinessChange += pref;
    } else {
      console.warn(`Missing preference for ${char.name} - ${actionType}`);
    }
  });

  currentSession.score += happinessChange;
  currentSession.circles = shuffleCircles(currentSession.circles.flat());

  res.render('game', {
    title: 'Social Circles',
    socialCircles: currentSession.circles,
    score: currentSession.score
  });
});

// POST /game/exit
router.post('/exit', (req, res) => { //SORRY I KNOW THIS IS SO MESSY
  const userId = req.session?.user?.userID;
  if (!userId) return res.status(401).send("Not logged in");

  const insertSession = `INSERT INTO GameSessions (userID, score) VALUES (?, ?)`; // goes in query file
  db.query(insertSession, [userId, currentSession.score], (err) => {
    if (err) return res.status(500).send("Failed to log game session");

    // wait i forgot to update end time

    const upsertLeaderboard = `
      INSERT INTO Leaderboard (userID, totalScore)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE totalScore = GREATEST(totalScore, VALUES(totalScore));
    `; //credit to chatgpt for updating the leader board- there is still an issue here i have to fix though.

    db.query(upsertLeaderboard, [userId, currentSession.score], (err) => {
      if (err) return res.status(500).send("Failed to update leaderboard");
      res.send("Game saved and leaderboard updated");
    });
  });
});

module.exports = router;