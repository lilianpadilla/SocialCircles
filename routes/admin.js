const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');
const {isAuthenticated} = require('../middleware/authentication')
const {
    banUser,
    updateUserToAdmin
   // resetScore
  } = require('../controllers/adminController')

router.get("/", isAuthenticated, (req, res) => {
  res.render('admin');
});
// for now were not using reset score
router.post('/ban', isAuthenticated, banUser);
router.post('/addAdmin', isAuthenticated, updateUserToAdmin);

module.exports = router;

