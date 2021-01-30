const mongodb = require('mongodb');
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/posts');
const express = require('express');

const bodyParser = require('body-parser');
const chalk = require('chalk');
const router = express.Router();
const db = require('../db/mongoose.js');
const auth = require('../middleware/auth');
const populateAuthorName = require('../utils/populateAuthorName');


router.get('/find', auth, async (req, res) => {

  //Finds all of the Blerbers that the user isn't following.
  const blerbers = await User.find({
    _id: {
      $ne: req.user._id,
      $nin: req.user.following
    }
  },
    null, {
    limit: 25
  }).lean();


  blerbers.forEach((blerber, i) => {
    delete blerber.password;
    delete blerber.password2;
    delete blerber.token;
    console.log(i, blerber);
  })
  res.status(200).send(blerbers);
})

///////////////FOLLOW////////////////////
router.post('/follow', auth, async (req, res) => {
  console.log(chalk.magenta('In /following/follow'));

  const followedBlerber = await User.findById(req.body.blerberToFollow).lean();


  //This should probably be encapsulated in Middleware eventually.
  //Deletes senstive information before sending the followed blerbers profile/blerbs to the user.
  console.log("followedBlerber: ", followedBlerber);
  delete followedBlerber.password;
  delete followedBlerber.password2;
  delete followedBlerber.token;
  delete followedBlerber.following;
  delete followedBlerber.posts;


  //If the blerber which the user just followed isn't already followed by them then their user ID is pushed onto the array of blerbers which the user follows.
  if (!req.user.following.includes(req.body.blerberToFollow)) {
    req.user.following.push(req.body.blerberToFollow);
    req.user.save();

    //Sends the profile information of the followedBlerber to the user.
    return res.status(200).send({
      alreadyFollowing: false,
      followed: followedBlerber       //ES6 syntax
    });

  } else {
    //Tells the frontend that the user already follows the selected blerber.
    return res.status(200).send({
      alreadyFollowing: true,
      error: "Already following that blerber.",
      followed: followedBlerber   //ES6 syntax
    });
  }
});  //end of the follow route.


router.get('/following', auth, async (req, res) => {
  //Gets an array of all of the blerbers that they current user follows.

  const followedUsers = await User.find({
    '_id': { $in: req.user.following }
  }, ['name', 'bio']).lean();

  return res.status(200).send(followedUsers);
})


router.post('/unfollow', auth, async (req, res) => {
  //Unfollow a blerber given the blerber's ID from the frontend.
  const unfollowID = req.body.blerberToUnfollow;

  req.user.following = req.user.following.filter(blerber => {
    return blerber.toString() !== unfollowID.toString();
  });

  await req.user.save();

  return res.status(200).send({ success: true });
});


module.exports = router;