//const express = require('express');
//const bcrypt = require('bcryptjs');
//const session = require('express-session');
//const mysql = require('mysql2');
//
//const app = express();
//app.set('view engine', 'ejs');
//app.use(express.urlencoded({ extended: true }));
//app.use(session({
//    secret: 'lily12shea22aliya25isworkinghardddd123onthisprojectperiod',
//    resave: false,
//    saveUninitialized: false,
//    cookie: { secure: false }
//}));
//app.use((req, res, next) => {
//    res.locals.user = req.session.user || null;
//    next();
//});
//
//
//// Database connection
//const db = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: '',
//    database: 'SocialCircles'
//});
//
//// Homepage
//app.get('/', (req, res) => {
//    res.render('index'); 
//});
//
//// Login Page
//app.get('/login', (req, res) => {
//    res.render('login');
//});
//
//// Register Page
//app.get('/register', (req, res) => {
//    res.render('register');
//});
//
//// Register Route
//app.post('/register', async (req, res) => {
//    const { email, username, password } = req.body;
//    const hashedPassword = await bcrypt.hash(password, 10);
//
//    const sql = `INSERT INTO Users (username, userPass, email, UserRole) VALUES (?, ?, ?, 'Account')`;
//    db.query(sql, [username, hashedPassword, email], (err) => {
//        if (err) {
//            console.error('Error registering:', err);
//            return res.status(500).send('Error registering.');
//        }
//        res.redirect('/login'); // Redirect to login after successful registration
//    });
//});
//
//// Login Route
//app.post('/login', (req, res) => {
//    const { username, password } = req.body;
//
//    const sql = `SELECT * FROM Users WHERE username = ?`;
//    db.query(sql, [username], async (err, results) => {
//        if (err || results.length === 0) {
//            return res.status(401).send('User not found.');
//        }
//
//        const isMatch = await bcrypt.compare(password, results[0].userPass);
//        if (!isMatch) {
//            return res.status(401).send('Incorrect password.');
//        }
//
//        req.session.user = { userID: results[0].userID, username: results[0].username };
//        res.redirect('/');
//    });
//});
//
//// Logout Route
//app.get('/logout', (req, res) => {
//    req.session.destroy(() => {
//        res.redirect('/');
//    });
//});
//
//// Start the server
//app.listen(3000, () => console.log('Server running on http://localhost:3000'));
//