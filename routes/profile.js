const express = require('express');
const router = express.Router();
const db = require('../database/connection'); 
const queries = require('../database/queries');
const { getProfile } = require('../controllers/profileController');

router.get("/", getProfile)
module.exports = router;
