const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');
const {
    banUser,
    updateUserToAdmin
   // resetScore
  } = require('../controllers/adminController')

router.get('/', (req, res) => 
    res.render('admin'));


router.post('/ban', banUser);
// router.post('/reset', resetScore);
router.post('/addAdmin', updateUserToAdmin);

module.exports = router;
