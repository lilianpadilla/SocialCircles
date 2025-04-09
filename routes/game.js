const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const queries = require('../database/queries');
const {
  shuffleArray,
  shuffleCircles,
  getCharacters,
  updateScore,
  saveGame,
} = require('../controllers/gameController')

router.get('/', getCharacters)
router.post('/action',updateScore)
router.post('/exit',saveGame)
module.exports = router;
