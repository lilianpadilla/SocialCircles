
DROP DATABASE IF EXISTS v2socialcircles;
CREATE DATABASE v2socialcircles;
USE v2socialcircles;


CREATE TABLE Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    userPass VARCHAR(200) NOT NULL,
    email VARCHAR(100) UNIQUE,
    status ENUM('Active', 'Banned') DEFAULT 'Active',
    UserRole ENUM('Account', 'Admin') NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- contains profile info we may want later
CREATE TABLE Profiles (
    profileId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    displayName VARCHAR(50),
    bio TEXT,
    FOREIGN KEY (userId) REFERENCES Users(userID) ON DELETE CASCADE
);


CREATE TABLE Characters (
    characterID INT AUTO_INCREMENT PRIMARY KEY,
    CharacterName VARCHAR(50) NOT NULL UNIQUE,
    personality TEXT,
    compliment INT NOT NULL,
    help INT NOT NULL,
    invite INT NOT NULL
);


CREATE TABLE GameSessions (
    sessionID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    score INT DEFAULT 0,
    startTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    endTime TIMESTAMP NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- may want to record game actions if user is interested in history 
CREATE TABLE GameActions (
    actionID INT AUTO_INCREMENT PRIMARY KEY,
    sessionID INT NOT NULL,
    roundNumber INT NOT NULL,
    circleIndex INT CHECK (circleIndex BETWEEN 1 AND 3),
    actionType ENUM('compliment', 'help', 'invite') NOT NULL,
    happinessChange INT NOT NULL,
    actionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sessionID) REFERENCES GameSessions(sessionID)
);


CREATE TABLE Leaderboard (
    leaderboardID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    totalScore INT NOT NULL,
    lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

-- keep track of what admins do 
CREATE TABLE AdminActions (
    actionID INT AUTO_INCREMENT PRIMARY KEY,
    adminID INT NOT NULL,
    userID INT,
    actionType ENUM('Ban', 'Score Reset'),
    actionDetails TEXT,
    actionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (adminID) REFERENCES Users(userID)
);

-- -- not final
-- CREATE TABLE PasswordResets (
--     resetID INT AUTO_INCREMENT PRIMARY KEY,
--     userID INT NOT NULL,
--     resetToken VARCHAR(200) NOT NULL, -- generate a pw reset token to email
--     expiration TIMESTAMP NOT NULL,
--     FOREIGN KEY (userID) REFERENCES Users(userID) -- ON DELETE CASCADE - probably wont need this as we are not deleting accounts, just switching their status
-- );

-- ALTER TABLE Leaderboard
-- ADD UNIQUE KEY unique_user (userID);
