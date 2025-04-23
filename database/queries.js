module.exports = {
    login: `SELECT * FROM Users WHERE username = ?`,
    register: `INSERT INTO Users (username, userPass, email, UserRole) VALUES (?, ?, ?, 'Account')`,
    descriptions: `SELECT CharacterName, personality FROM Characters`,
    characters: `SELECT * FROM Characters`,
    insertSession: `INSERT INTO GameSessions (userID, score) VALUES (?, ?)`,
    upsertLeaderboard: `INSERT INTO Leaderboard (userID, totalScore) VALUES (?, ?)
                        ON DUPLICATE KEY UPDATE totalScore = GREATEST(totalScore, VALUES(totalScore));`,
    leaderboardResults: `SELECT u.username, l.totalScore FROM Leaderboard l JOIN Users u 
                        ON u.userId = l.userId
                        ORDER BY l.totalScore DESC
                        LIMIT 9;`,
    miniLeaderboard: `SELECT u.username, l.totalScore FROM Leaderboard l JOIN Users u 
                        ON u.userId = l.userId
                        ORDER BY l.totalScore DESC
                        LIMIT 3;` // may not need this anymore


};