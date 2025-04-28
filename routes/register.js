const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');
const { registerUser } = require('../controllers/registerController');
const {isAuthenticated} = require('../middleware/authentication')

router.get('/', (req, res) => res.render('register'));
router.post('/', registerUser);

// router.post('/', registerUser, isAuthenticated);


module.exports = router;

