const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');
const { registerUser } = require('../controllers/registerController');

router.get('/', (req, res) => res.render('register'));

router.post('/', registerUser);

module.exports = router;

