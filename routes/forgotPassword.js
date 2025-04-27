const express = require('express');
const router = express.Router();
const { showForgotPasswordPage, userForgotPassword } = require('../controllers/forgotPassController');

router.get('/', showForgotPasswordPage);
router.post('/', userForgotPassword);

module.exports = router;
