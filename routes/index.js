const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index'); 
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.set('Cache-Control', 'no-store');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.redirect('/');
    });
});

module.exports = router;
