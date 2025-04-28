DROP DATABASE IF EXISTS v2SocialCircles;
CREATE DATABASE v2SocialCircles;
USE v2SocialCircles;
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

-- insert statements to add characters
INSERT INTO Characters (CharacterName, Personality, compliment, help, invite) VALUES
('Lili', 'She enjoys compliments but prefers to handle things on her own and is selective with her social time.', 2, -1, 0),
('Jake', 'He appreciates support but avoids attention and dislikes being pulled into social situations.', 0, 1, -2),
('Kim', 'She avoids standing out but always says yes to a fun invite.', -1, 0, 2),
('Alex', 'He is awkward with compliments but likes when he can give or receive real help in a small group.', -2, 2, 1),
('Karen', 'Loves being complimented and invited but gets frustrated when people try to manage things for her.', 2, -2, 1),
('John', 'He quietly values help but prefers to stay out of big events and ignores compliments.', 0, 1, -1),
('Max', 'He always goes out and enjoys being recognized, though he rarely asks for help.', 1, 0, 2),
('Sammie', 'She looks for support and avoids events and deep talks.', 0, 2, -1),
('Taylor', 'She loves being admired and invited out but dislikes being offered help she didn’t ask for.', 1, -1, 2);

--manually change a user to admin on workbench
-- UPDATE Users
-- SET userrole = 'Admin' 
-- WHERE username = ''; -- enter username


-- ALTER TABLE Leaderboard
-- ADD UNIQUE KEY unique_user (userID);
