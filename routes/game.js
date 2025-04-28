const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const queries = require('../database/queries');
const { isAuthenticated } = require('../middleware/authentication');
const {
  shuffleArray,
  shuffleCircles,
  getCharacters,
  updateScore,
  saveGame,
} = require('../controllers/gameController');

router.get('/', getCharacters)
router.post('/action',updateScore)
router.post('/exit',saveGame)

//attempt at caching

// router.get('/', isAuthenticated, (req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect('/login');
//   }
//   getCharacters(req, res, next);
// });

// router.post('/action', isAuthenticated, (req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect('/login');
//   }
//   updateScore(req, res, next);
// });

// router.post('/exit', isAuthenticated, (req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect('/login');
//   }
//   saveGame(req, res, next);
// });

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('../database/connection');
// const queries = require('../database/queries');
// const {isAuthenticated} = require('../middleware/authentication')
// const {
//   shuffleArray,
//   shuffleCircles,
//   getCharacters,
//   updateScore,
//   saveGame,
// } = require('../controllers/gameController')



// module.exports = router;
