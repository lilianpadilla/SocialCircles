# Social Circles
Social Circles is a Node.js, Express.js, EJS, MySQL project for a web-based game that allows users to interact with character groups. Our web game allows both user and admin controls

## File and Directory Guide
- /**Archives**: Old files that are not in use, but we thought they would be too risky to delete. However, we have not really referenced them
- /**bin**: Untouched; express template
- /**Controllers**: Contains all the logic used inside of HTTP Requests and interactions with the database
- /**Database**: Contains our DB connection along with a SQL script to get a local DB set up. Also contains queries used throughout the controllers
- /**Middleware**: Functions to be used for all routes
- /**Public**: Files that are available client-side, such as images, stylesheets, some javascripts
- /**Routes**: Handles all the routing logic
- /**Views**: Dynamic front-end pages for our game 
- **app.js**: Entry point to our express app

## DB Schema
- Our database schema, however, some tables we did not end up using given priorities and time contraints

| Table | Desc | In use|
|----------|----------|----------|
| Users   | User credentials and account attributes  | Yes  |
| Profiles    | Public profile data  | No  |
| Characters   | Game characters with personalities   | Yes  |
| GameSessions   | Records game data | Yes  |
| GameActions  | Records game interactions  | No  |
| Leaderboard  | Keeps track of scores for leaderboard   | Yes  |
| AdminActions  | Records admin actions   | No  |



## Installation & Setup
1. Clone the repository:
   ```sh
   https://github.com/lilianpadilla/SocialCircles.git
   cd SocialCircles
   ```
2. Ensure you install dependencies
    ```
    npm install
    ```

3. On workbench, set up local DB by changing the connection to your credentials and running v2SocialCircles.sql in the database folder

4. To start the app, run
    ``` 
    npm start
     ```
     To test, run
    ```
     npm test
     ```

## Controllers
- **admin**
- - **banUser**: updates a user's account status to banned, making them unable to log in
- - **updateUserToAdmin**: updates a user's userRole to admin, making them able to log in as an admin
- **descriptions**
- - **getDescriptions**: retrieves character descriptions from DB and displays them on the descriptions view
- **game**
- - **ShuffleArray**: takes an array and returns the same array with shuffled elements
- - **shuffleCircles**: takes in a an array and slices it to 3 subarrays
- - **mapCharacters**: takes in a list of characters and maps their name to preferences
- - **getCharacters**: loads character and session data (including mini leaderboard). send data to game view
- - **updateScore**: retrieves action and circle index chosen by the user, adds each character's preference (int) for that action to the score. then reshuffles circles and re-updates the mini leaderboard
- - **saveGame**: updates/inserts user session data in the gameSession and leadboard tables
- **leaderboard**
- - **getLeaderboard**: loads leaderboard results and maps their index to leaderboard ranks. Originally wanted to add profile photos, but we may not get to that, so the icons are blank. renders leaderboard view
- - **getMiniLeaderboard**: function to be used in game controller to retrieve top 3 leaderboard results, could possibly be redone 
- **login**
- - **userLogin**: retrieves form information from log in page, verifies if credentials match DB results. creates session with data, redirects to game or admin page depending on user role
- **profile**
- - **getProfile**: renders profile page
- **register**
- - **registerUser**: retrieves form information from register page, encrypts password and enters it into users table. redirects to login page

## Middleware
- **authentication**
- - **isAuthenticated**:Cache-Control to be used by the routes
## Public Scripts
 - **game**
 - - Allows for interaction between the user and webpages, such as redirecting to pages and handling post request from user's action of choice
 - **passVal**
 - - sets requirements for user's password when registering

## Testing
- Located in /Controllers (files with .test.js)
- Jest Framework
- To test, run
    ```
    npm test
    ```
# Outstanding Issues
## Our game has many small issues that are optional to fix, however there are other critical issues that need attention
1. **Cache-Control**: Our game does not prevent users from accessing private information once already logged out.
2. Admin controls: While we admins have the ability to ban or promote users, they do not have the option to undo those actions
3. Error notifications: While our error handling is decent, we do not have pretty pages or pop-ups for errors, just a white page with the error status number and a message
4. Leaderboard: Banned users still appear on the leaderboard
5. Redundant CSS Files: some of our css files repeat the same styling, could use a refactor
6. miniLeaderboard function works, but its probably not written well
7. Some of the gameController functionalities can be broken down, since there are multiple operations being performed. This would make it easier to test...



