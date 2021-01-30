require('dotenv').config()
const express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const chalk = require('chalk');

var usersRouter = require('./routes/users');
var feedRouter = require('./routes/feed');
var followingRouter = require('./routes/following');
// const generatePassword = require('password-generator');
// const cors = require('cors');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}
// Serve static files from the React app


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));



app.use('/feed', feedRouter);
app.use('/users', usersRouter);
app.use('/following', followingRouter);

app.get('/', (req, res) => {
  // res.send("<h1>Served from * route</h1>")
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// The "catchall" handler: for any request that doesn't
// match one above, sends back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Blerdeblerb listening on ${port}`);
});
