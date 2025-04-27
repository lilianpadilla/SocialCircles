const express = require('express');
const router = express.Router();
const db = require('../database/connection'); 
const queries = require('../database/queries');
const { getDescriptions } = require('../controllers/descriptionsController');
const {isAuthenticated} = require('../middleware/authentication')

router.get("/", getDescriptions)
module.exports = router;
