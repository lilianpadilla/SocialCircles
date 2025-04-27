module.exports = {
    login: `SELECT * FROM Users WHERE username = ?`,
    register: `INSERT INTO Users (username, userPass, email, UserRole) VALUES (?, ?, ?, 'Account')`,
    descriptions: `SELECT CharacterName, personality FROM Characters`,
    characters: `SELECT * FROM Characters`,
    insertSession: `INSERT INTO GameSessions (userID, score) VALUES (?, ?)`,
    upsertLeaderboard: `INSERT INTO Leaderboard (userID, totalScore) VALUES (?, ?)
                        ON DUPLICATE KEY UPDATE totalScore = GREATEST(totalScore, VALUES(totalScore));`,
    leaderboardResults: `SELECT u.username, MAX(l.totalScore) AS totalScore
                        FROM Leaderboard l
                        JOIN Users u ON u.userId = l.userId
                        GROUP BY u.userId
                        ORDER BY totalScore DESC
                        LIMIT 10;`,
    miniLeaderboard: `SELECT u.username, MAX(l.totalScore) AS totalScore
                        FROM Leaderboard l
                        JOIN Users u ON u.userId = l.userId
                        GROUP BY u.userId
                        ORDER BY totalScore DESC
                        LIMIT 3;` ,// may not need this anymore
    updateUserToAdmin: `UPDATE Users SET UserRole = 'Admin' WHERE username = ?`,
    resetScore: `UPDATE Leaderboard SET totalScore = 0 WHERE username = ?`,
    banUser: `UPDATE Users SET status = 'Banned' WHERE username = ?`,


};