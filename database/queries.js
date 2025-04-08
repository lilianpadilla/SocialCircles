module.exports = {
    login: `SELECT * FROM Users WHERE username = ?`,
    register: `INSERT INTO Users (username, userPass, email, UserRole) VALUES (?, ?, ?, 'Account')`
};