const db = require('../database/connection');
const bcrypt = require('bcryptjs');
const queries = require('../database/queries');

const showForgotPasswordPage = (req, res) => {
    res.render('forgotPassword');
};

const userForgotPassword = async (req, res) => {
    const { username, securityCode, newPassword } = req.body;

    db.query(queries.findUserByUsername, [username], async (err, results) => {
        if (err || results.length === 0) {
            console.error('User not found.');
            return res.status(400).send('User not found.');
        }

        const user = results[0];
        const match = await bcrypt.compare(securityCode, user.securityCode);

        if (!match) {
            console.error('Security code incorrect.');
            return res.status(400).send('Security code is incorrect.');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        db.query(queries.updateUserPassword, [hashedNewPassword, username], (err) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).send('Error updating password.');
            }
            res.redirect('/login');
        });
    });
};

module.exports = {showForgotPasswordPage, userForgotPassword}