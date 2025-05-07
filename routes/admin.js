const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');
const {isAuthenticated} = require('../middleware/authentication')
const {
    banUser,
    updateUserToAdmin,
    unbanUser,
    demoteUser
   // resetScore
  } = require('../controllers/adminController')


//router.get('/', (req, res) => 
//  res.render('admin'));

router.get('/', isAuthenticated, (req, res) => res.render('admin'));
router.post('/ban', isAuthenticated, banUser);
router.post('/addAdmin', isAuthenticated, updateUserToAdmin);
router.post('/unban', isAuthenticated, unbanUser);
router.post('/demote', isAuthenticated, demoteUser);

// router.post('/ban', banUser);
// router.post('/addAdmin', updateUserToAdmin);
// router.post('/reset', resetScore); // did not end up using


// attempt at caching

// router.get("/", isAuthenticated, (req, res) => {
//   res.render('admin');
// });
// // for now were not using reset score
// router.post('/ban', isAuthenticated, banUser);
// router.post('/addAdmin', isAuthenticated, updateUserToAdmin);

module.exports = router;

