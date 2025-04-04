CREATE DATABASE SocialCircles; 
USE SocialCircles;     

-- USERS 
CREATE TABLE Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    userPass VARCHAR(200) NOT NULL,
    email VARCHAR(100) UNIQUE,
    status ENUM('Active', 'Banned') DEFAULT 'Active',
    UserRole ENUM('Account', 'Guest', 'Admin') NOT NULL, -- use enum to make a set of predefined values
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROFILES 
CREATE TABLE Profiles (
    profileId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    displayName VARCHAR(50),
    bio TEXT,
    FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE
);

-- CHARACTERS (The ame characters with preferences)
CREATE TABLE Characters (
    characterId INT AUTO_INCREMENT PRIMARY KEY,
    CharacterName VARCHAR(50) NOT NULL,
    personality TEXT,
    happinessScore INT DEFAULT 0
);

-- GAME INTERACTIONS ( user decisions -> outcomes)
CREATE TABLE GameInteractions (
    interactionId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    characterId INT NOT NULL,
    decision TEXT NOT NULL,
    -- happinessChange INT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (characterId) REFERENCES Characters(characterId)
);

-- to track scores for profiles
CREATE TABLE PointsHistory (
    historyId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    scoreChange INT NOT NULL,
    reason TEXT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(userId)
);


-- LEADERBOARD 
CREATE TABLE Leaderboard (
    leaderboardId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    totalScore INT NOT NULL,
    lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

-- ADMIN (monitoring / control)
CREATE TABLE adminActions (
    actionId INT AUTO_INCREMENT PRIMARY KEY,
    adminId INT NOT NULL,
    userId INT,
    actionType ENUM('Ban', 'Score Reset', 'Profile Edit'),
    actionDetails TEXT,
    actionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (adminId) REFERENCES Users(userId)
);

-- just in case a user forgets password
CREATE TABLE PasswordResets (
    resetId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    resetToken VARCHAR(200) NOT NULL,
    expiration TIMESTAMP NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE
);


-- EXAMPLES:
-- Insert New User
INSERT INTO Users (username, userPass, email, UserRole)
VALUES ('Shea', '123456789', 'Shea123@email.com', 'Account');

-- Character Data
INSERT INTO Characters (CharacterName, personality, happinessScore)
VALUES ('Lili', 'Loyal, Friendly', 60);

