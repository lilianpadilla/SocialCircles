var express = require('express');
var session = require('express-session');
var path = require('path');
var app = express();
var createError = require('http-errors');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// session 
app.use(session({
    secret: 'lily12shea22aliya25isworkinghardddd123onthisprojectperiod',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
}));

// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store'); //reload from server, not memory
//   next();
// });


// Expose session user to all views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


// Routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const usersRouter = require('./routes/users');
const descriptionsRouter = require('./routes/descriptions');
const gameRouter = require('./routes/game');
const leaderboardRouter = require('./routes/leaderboard');
const profileRouter = require('./routes/profile');
const adminRouter = require('./routes/admin');
const forgotPasswordRouter = require('./routes/forgotPassword');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/descriptions', descriptionsRouter);
app.use('/game', gameRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/profile', profileRouter);
app.use('/admin', adminRouter);
app.use('/forgotPassword', forgotPasswordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // // render the error page
    // res.status(err.status || 500);
    // res.render('error');
    res.status(404).render('errors/404'); 
    res.status(500).render('errors/500'); 
  });


module.exports = app;


const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
