# Social Circles
A semester long project for Trinity University's Software Engineering Course.
Social Circles is a Node.js, Express.js, EJS, MySQL project for a web-based game that allows users to interact with character groups. Our web game allows both user and admin controls.


## Overview
Social Circles is a free online game where users can exercise their emotional intelligence in a fun, colorful and competitive environment. The goal is to not only maximize a social group's happiness through intuition and quick decision-making, but to maximize your total score. 

### How to Play
There are three "Social Circles," each with three characters in each circle. Once you click on a circle, you are presented with three possible actions: Give Compliment, Offer Help, and Invite to Event. These actions can positively or negatively impact your "Happiness Score," depending on what characters are within each circle. 

Every user has the advantage of viewing what each character likes and dislikes using the Characters Description page to help choose the right action to take. However, each time you click on a particular circle with a desired action--e.g. Social Circle #1, Offer Help-- the characters will randomize! 

Choose wisely, and **have fun!**


## Features
- **Social Circles Game Page**: Main gameplay interface where users interact with game characters and make decisions to optimize happiness
- **Character Description Page**: Details a character's personality, preferences, and how different actions affect their happiness. 
- **Leaderboard Page**: Displays the top players ranked by their scores. 
- **Account Profile**: Shows user details (username, user id), their maximum score, and other performance metrics
- **Adminstrative Profile**: Admins have the ability to ban users or to promote users to become an admin
- **Register and Login**: Users can register or log into their pre-existing account.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/lilianpadilla/SocialCircles.git
   cd SocialCircles
   ```
2. Ensure you install dependencies
    ```
    npm install
    ```

3. On workbench, set up local DB by changing the connection to your credentials and running v2SocialCircles.sql in the database folder
 - You will need to create your own .env file in the root directory, so run
    ```
    npm install dotenv
    ```
    and add this template to .env with your DB credentials
    ```
    DB_HOST=yourhost
    DB_USER=youruser
    DB_PASSWORD=yourpassword
    DB_NAME=v2SocialCircles
    ```

4. To start the app, run this command, then go to localhost:3000 on your browser
    ``` 
    npm start
     ```
     To test, run
    ```
     npm test
     ```

## Collaborators
This project is a collaboration between Shea Bedminster, Lilian Padilla, and Aliya Noe.


