const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/connection');
const queries = require('../database/queries');

function isAuthenticated(req, res, next) {
    res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');

    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/login');
    }
}
  module.exports = {isAuthenticated}