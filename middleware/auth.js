const mongoose = require('mongoose');
const db = require('../db/mongoose.js');
const User = require('../models/user')
const jwt = require('jsonwebtoken');

const chalk = require('chalk');
const atob = require('atob');


const auth = async (req, res, next) => {
  // console.log(chalk.yellow("Inside auth"));
  let headers = req.headers;
  // console.log(headers);
  let token = req.headers.authorization;

  // console.log(chalk.yellowBright(token));

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const parsedToken = parseJwt(token);

  try {
    const user = await User.findById(parsedToken.id);
    // console.log(chalk.blueBright(user));
    // return res.status(200).send(user);
  } catch (e) {
    // console.log("Could not find user by parsedToken.");
  }

  // console.log("Parsed token: ", parseJwt(token));

  if (token && token.split(' ')[1]) {
    token = req.headers.authorization.split(' ')[1].toString();
  } else {
    // console.log('no token in auth route');
    return res.status(404).send({ error: "Not verified" });
  }

  //TEMP_SECRET

  let decoded;
  try {
    decoded = jwt.verify(JSON.parse(token), process.env.TEMP_SECRET);
    // console.log(chalk.magenta(decoded));
  } catch (err) {
    // console.log("err: ", err);
    return res.status(404).send({ error: "Not Verified" })
  }

  // console.log("Decoded: ", decoded);

  const id = mongoose.Types.ObjectId(decoded.id);

  // console.log(id);

  try {
    const user = await User.findById(id);
    req.user = user;
    delete req.user.password
    delete req.user.password2
    next();
    // return res.status(200).send(user);
  } catch (e) {
    // console.log(e);
    return res.status(404).send({ error: "Not Verified" })
  }
}

module.exports = auth;

  // BACKEND
  // [x]  console.log the token.
  // [x]  Remove the Bearer prefix.
  // [x]  Verify the JWT.
  // [x]  Refactor to use try/catch.
  // [x]     ---Return an error if it did not work.
  // [x]  Use JWT to find the user.
  // [x]     ---Return an error if it did not work.
  // [x]  Sends back the user.
  // [x]  Refactor this code into the middleware.
  // [x]  Attach the user to res object.
  // [ ]  Improve the error checking and look other examples.