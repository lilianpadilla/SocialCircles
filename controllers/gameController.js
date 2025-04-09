const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const queries = require('../database/queries');
const { getMiniLeaderboard } = require('../controllers/leaderboardController');

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

function mapCharacters(characterList){
  /*
  input: list of characters (likely from db)
  output: a mapping between the characters and their preferences (ints)
  */
  charMap = characterList.map(row => ({
    name: row.CharacterName,
    preferences: {
      compliment: row.compliment,
      help: row.help,
      invite: row.invite
    }
  }));
  return charMap
}


let currentSession = {
  // initializes a session with default score 0 and empty circles array
  score: 0,
  circles: []
};


const getCharacters = ((req, res) => { 
  db.query(queries.characters, (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send("Failed to load characters");
    }
    let characters = mapCharacters(results)
    const socialCircles = shuffleCircles(characters);

    currentSession = {
      circles: socialCircles,
      score: 0
    }; 

    getMiniLeaderboard(3, (err, topPlayers) => {
      if (err) return res.status(500).send("Failed to load leaderboard");

    res.render('game', {
      title: 'Social Circles',
      socialCircles,
      score: currentSession.score,
      miniLeaderboard: topPlayers
      });
    });
  });
});


const updateScore = ((req, res) => {
  const {actionType, circleIndex} = req.body;
  const selectedCircle = currentSession.circles[circleIndex];
  let happinessChange = 0;

  selectedCircle.forEach(char => { //takes the action chosen and sees the integer mapped to it
    const pref = char.preferences?.[actionType];
    if (typeof pref === 'number') {
      happinessChange += pref; // ads action preference (int) to happiness change
    } else {
      console.warn(`Missing preference Integer for ${char.name} - ${actionType}`);
    }
  });

  currentSession.score += happinessChange;
  currentSession.circles = shuffleCircles(currentSession.circles.flat()); // combines to one array and reshuffles+splice

  getMiniLeaderboard(3, (err, topPlayers) => {
    if (err) return res.status(500).send("Failed to reload leaderboard");

    res.render('game', {
      title: 'Social Circles',
      socialCircles: currentSession.circles,
      score: currentSession.score,
      miniLeaderboard: topPlayers
    });
  });
});

// POST /game/exit
const saveGame = ((req, res) => { 
  const userId = req.session?.user?.userID;
  if (!userId) return res.status(401).send("Not logged in");

  db.query(queries.insertSession, [userId, currentSession.score], (err) => {
    if (err) return res.status(500).send("Failed to log game session");

    // wait i forgot to update endTime

    db.query(queries.upsertLeaderboard, [userId, currentSession.score], (err) => {
      if (err) return res.status(500).send("Failed to update leaderboard");
      res.send("Game saved and leaderboard updated");
    });
  });
});

module.exports = {
    shuffleArray,
    shuffleCircles,
    getCharacters,
    updateScore,
    saveGame,
};