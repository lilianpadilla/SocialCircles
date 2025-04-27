const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const queries = require('../database/queries');
const { getLeaderboard, getMiniLeaderboard } = require('../controllers/leaderboardController')
const {isAuthenticated} = require('../middleware/authentication')

router.get('/', getLeaderboard)

module.exports = router;
