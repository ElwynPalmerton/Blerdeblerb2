const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passwordValidator = require('password-validator');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');

const auth = require('../middleware/auth');
const db = require('../db/mongoose.js');
const User = require('../models/user');
const populateAuthorName = require('../utils/populateAuthorName');
const cors = require('cors');

const SALT_ROUNDS = 8;
////////////////////////////////////////////////////


const app = express();

const schema = new passwordValidator();
schema
  .is().min(8)
  .has().uppercase()
  .has().digits(1)
  .has().symbols(1);

router.post('/register', cors(), async (req, res) => {
  const { name: username, password: password1, passwordAgain: password2 } = req.body;

  //Passwords match.
  if (password1 !== password2) {
    console.log(chalk.blue('passwords do not match'));
    return res.status(200).send({ error: "Passwords must match." });
  }

  //Check for valid password.
  if (!schema.validate(password1)) {
    console.log(chalk.blue('invalid password'));
    return res.status(200).send({ error: "Password must contain an uppercase letter, one number, and non-alphanumeric character" });
  }

  //Check to see if that username already exists.
  let existingUser;
  try {
    existingUser = await User.findOne({ name: username });
  } catch (e) {
    console.log(e);
    return res.send(e);
  }

  if (existingUser) {
    console.log(chalk.yellow("Duplicate User"));
    return res.status(200).send({ error: 'That user Name is already taken.' });
  }


  try {
    const result = await bcrypt.hash(password1, SALT_ROUNDS)

    //Save the new user to the database.  
    const newUser = new User({
      name: username,
      password: result,
    });

    let user = await newUser.save();


    //Config data for the the JWT.
    const userInfo = {
      name: user.name,
      id: user._id.toString(),
    }

    //Create the JWT with the user's info attached.
    const token = jwt.sign(userInfo, process.env.TEMP_SECRET);
    user.token = token;


    //Save the user with the jwt.
    user.save()
      .then(userWithToken => {
        console.log("User with token: ", userWithToken.following);

        //Send the user profile with the JWT to the user.
        return res.status(201).send({
          name: userWithToken.name,
          id: userWithToken._id.toString(),
          test: "This is the result",
          token: token,
        })
      })
      .catch(e => {      //Catch block for saving with token.
        res.status(403).send(e);
      })

  } catch (e) {
    console.log('registration error: ', e);
    return res.status(200).send({ error: 'Registration failed.' });
  }
});

/////////////////////LOGIN///////////////////////

router.post('/login', async (req, res) => {
  console.log(chalk.magenta('Inside Login'))
  console.log(chalk.yellow(req.body.name));

  try {
    //Find the user.
    const foundUser = await User.findOne({ name: req.body.name });
    console.log("found:", foundUser);

    //If the user is not found, login failed.
    if (foundUser === null) {
      console.log(chalk.yellow("User not found."));
      return res.status(200).send({ error: "Login Failed." });
    }

    //Match the user's password to the one submitted from the client.
    const match = bcrypt.compare(req.body.password, foundUser.password)

    //If the password does not match, login failed.
    if (match === false) {
      return res.status(200).send({ Error: "Login Failed." });
    }


    //If the user logged in successfully create the JWT.
    //Config the JWT.
    const userInfo = {
      name: foundUser.name,
      id: foundUser._id.toString()
    }

    //Create the JWT.
    const token = jwt.sign(userInfo, process.env.TEMP_SECRET);

    foundUser.token = token;

    //Save the user with the token.
    foundUser.save()
      .then(userWithToken => {
        console.log("userWithToken: ", userWithToken.following);

        const id = userWithToken._id.toString();
        return res.status(200).send({
          name: userWithToken.name,
          id: id,
          token: userWithToken.token,
          following: userWithToken.following
        })
      })
      .catch((e) => {
        console.log(e);
      })

  } catch (e) {
    console.log("Failure to login: ", e);
  }
})

//Development only route to test the auth route.
router.get('/checkAuth', auth, async (req, res) => {
  console.log(chalk.magenta('Inside /checkAuth'));

  return res.status(200).send({ user: req.user });
});

//Updates the user's bio.
router.post('/bio', auth, async (req, res) => {
  //Receives the bio from the client and adds it to the user in the db.
  try {
    req.user.bio = req.body.bio;
    await req.user.save();
  } catch (e) {
    return res.status(400).send({ error: "unable to update bio" })
  }

  //Returns the bio to confirm.
  return res.status(200).send(req.user.bio);
})

//Multer middleware configured for updating the user profile.
const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      console.log("not a png")
      return cb(new Error('Please upload a .png, .jpg, or .jpeg file.'))
    }

    cb(undefined, true);


  }
});

const errorMiddleware = (req, res, next) => {
  throw new Error('From my middleware');
}
// upload.single('myImage')


router.post('/image', auth, upload.single('myImage'), async (req, res) => {
  console.log('in image:');
  console.log(req.file.buffer);

  //Use sharp to resize the image.
  const buffer = await sharp(req.file.buffer).resize(
    {
      width: 200,
      height: 200
    }).png().toBuffer();


  req.user.avatar = buffer;
  await req.user.save();



  return res.status(200).send("Success message");



}, (error, req, res, next) => {
  console.log("error: ", error.message);
  return res.status(401).send({ error: error.message });
});


//No auth in this route because anyone can access user images anyway.
//And the request is just the url for the image, not an axios/fetch request.
router.get('/avatar/:id', async (req, res) => {
  //finds the avatar for the user using ID in the params field.

  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.type('png');
    return res.send(user.avatar);

  } catch (e) {
    res.status(404).send();
  }

})

//Routes for google-passport-OAuth20
// //passport google strategy is configured in config/passport-setup.js
// router.get('/google', passport.authenticate('google', {
//   scope: ['profile']
// }))

// router.get('/success', passport.authenticate('google'), (req, res) => {
//   //This route is unfinished. Currently working on it...
//   //I need to setup passport with the options Success Redirect and Failure Redirect.

//   console.log("Google Login Success");

//   //req.user is available on the req object because it is deserialized by passport
//   //passport.initialize() and cookieSession are necessary for this.

//   res.send('<h1>Hello</h1>')
//   console.log("USER: ", req.user);
//   // req.session.bleh = "bleh";
//   // res.send('You have reached the callback uri');
//   // res.redirect('../profile')

// });

module.exports = router;