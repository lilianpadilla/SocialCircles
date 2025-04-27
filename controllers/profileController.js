const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const queries = require('../database/queries');

const getProfile =  ((req, res) => {
    res.render('profile', { title: 'profile'});
});

module.exports = {getProfile};