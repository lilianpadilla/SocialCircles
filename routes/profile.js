const express = require('express');
const router = express.Router();
const db = require('../database/connection'); 
const queries = require('../database/queries');
const { getProfile } = require('../controllers/profileController');
const {isAuthenticated} = require('../middleware/authentication')

// router.get("/", isAuthenticated, (req, res) => {
//     res.set('Cache-Control', 'no-store');
//     res.set('Pragma', 'no-cache');
//     res.set('Expires', '0');
//     res.render('profile', { title: 'Profile' });
//   });

router.get('/', getProfile)
module.exports = router;
