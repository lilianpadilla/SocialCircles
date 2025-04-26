const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');
const { userLogin } = require('../controllers/loginController');

router.get('/', (req, res) => 
    res.render('admin'));

router.post('/', userLogin);

module.exports = router;
