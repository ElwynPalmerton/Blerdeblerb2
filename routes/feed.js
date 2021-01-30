const mongodb = require('mongodb');
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/posts');
const Reblerb = require('../models/reblerbs');
const express = require('express');
const { DateTime } = require("luxon");

const bodyParser = require('body-parser');
const chalk = require('chalk');
const router = express.Router();
const db = require('../db/mongoose.js');
const auth = require('../middleware/auth');
const { populateName, populateNames } = require('../utils/populateAuthorName');

const { getDateAgo, getHoursAgo, getMinutesAgo } = require('../utils/getDateAgo');
//Making a post:
router.get('/post', auth, (req, res) => {
  return res.send('<h1>Hello Feed</h1>')
});

const MAX_POSTS = 10;

router.post('/post', auth, async (req, res) => {
  console.log(chalk.blue('Inside post /feed/post route'));

  //Text to be posted/"blerbed"
  const postText = req.body.text;

  //Create the new post.
  const newPost = new Post({
    text: postText,
    author: req.user._id,
    owner: req.user._id,
    isReblerb: false,
  });

  //Save he post
  try {
    const savedPost = await newPost.save();

    //populatedPost
    const popPost = await savedPost
      .populate({
        path: 'author',
        model: User
      })
      .execPopulate();

    //Populate the last two posts for the user.
    //This was just a development test to see if things are working.
    await req.user
      .populate(
        {
          path: 'virtualPosts',
          options: {
            sort: {
              createdAt: -1
            }
          },
          model: Post,
          limit: 2
        })
      .execPopulate();

    //Return the post to incorporate it into the feed.
    return res.status(201).send(popPost);
  } catch (e) {
    console.log(e);
    return res.status().send('Unable to make a post at this time.');
  }
})

//Gets the user's posts.
router.get('/posts', auth, async (req, res) => {

  //Populate the last five posts for the user.
  await req.user
    .populate(
      {
        path: 'virtualPosts',
        options: {
          sort: {
            createdAt: -1
          }
        },
        model: Post,
        limit: 5
      })
    .execPopulate();

  //Populate the posts.
  let populatedPosts = await populateNames(req.user.virtualPosts, 'author');
  populatedPosts = await populateNames(populatedPosts, 'owner');

  //Send the posts to the client.
  res.status(201).send(populatedPosts);

})


router.get('/blerbstream/', auth, async (req, res) => {
  console.log(chalk.magenta('/blerbstream'));

  //If there is a date for when it was last update it only sends the posts mmade since then.
  let lastUpdatedDT = DateTime.fromISO(req.query.lastUpdated);
  let nowDT = DateTime.local();

  //Gets posts for an arbitrary amount of time previous to now but limits it to MAX_POSTS.
  let nowMinusMonth = nowDT.minus({ month: 3 });

  //Find the current date minus thirty daays ago.
  const currentDate = new Date();
  let start = getDateAgo(currentDate, 30);
  if (lastUpdatedDT > nowMinusMonth) {
    start = lastUpdatedDT.plus({ seconds: 5 }).toISO();
  } else {
    // console.log("nowDT is more recent");
  }

  let following = req.user.following;

  following.push(req.user._id);

  const posts = await Post.find({
    "createdAt": {
      "$gte": start,
    },
    owner: {
      $in: following,
    }

  },
    ['text', '_id', 'author', 'totalLikes', 'likes', 'isReblerb', 'owner', 'createdAt'],
    {
      limit: MAX_POSTS,
      sort: {
        createdAt: -1
      }
    }
  );

  //Populate the posts.
  let populatedPosts = await populateNames(posts, 'author');
  let populatedOwner = await populateNames(populatedPosts, 'owner');

  //Send the posts to the frontend.
  return res.status(200).send(populatedOwner);
});


router.get('/history', auth, async (req, res) => {
  //Gets blerbs that are older than the blerbs currently in the user's feed.

  //Takes the date of the oldest blerb in the feed and then gets the (MAX_POSTS) number of immediately preceding blerbs that are older than that

  let oldestBlerbDT = DateTime.fromISO(req.query.oldestBlerb);
  const oldest = req.query.oldestBlerb;
  console.log("Oldest Blerb: ", oldestBlerbDT.toLocaleString(DateTime.DATETIME_SHORT));

  console.log("page: ", req.query.page);

  //Include the user's own blerbs.
  let following = req.user.following;
  following.push(req.user._id);

  //Get the blerbs.
  const posts = await Post.find({
    "createdAt": {
      "$lt": oldest,
    },
    owner: {
      $in: following,
    }
  },
    ['text', '_id', 'author', 'totalLikes', 'likes', 'isReblerb', 'owner', 'createdAt'],
    {
      limit: MAX_POSTS,
      sort: {
        createdAt: -1
      }
    }
  );

  //Populate the Blerbs.
  let populatedPosts = await populateNames(posts, 'author');
  let populatedOwner = await populateNames(populatedPosts, 'owner');

  //Send the blerbs to the frontend.
  return res.status(200).send(populatedOwner);
})

router.post('/like', auth, async (req, res) => {
  //IF IT'S A REBLERB: 
  //Find the original blerb.
  //Add the current user to its LIKES array.
  //Get the LIKES count.
  //Set the totalLikes on the Liked post equal to the reblerbed post.

  //Finds the post by ID.
  const likedPost = await Post.findById(req.body.postID);

  console.log('likedPost', likedPost);


  if (likedPost.isReblerb) {
    //IF IT'S A REBLERB: 
    //Find the original blerb.
    //Add the current user to its LIKES array.
    //Get the LIKES count.
    //Set the totalLikes on the Liked post equal to the reblerbed post.

    //Make a try catch block for the data finding.
    //Or just make one around the whole thing.

    let originalBlerb;
    let errorMessage = '';
    try {
      const reblerbRef = await Reblerb.findById(likedPost.reblerbOf);
      originalBlerb = await Post.findById(reblerbRef.reblerb);
    } catch (e) {
      //Send error, unable to find the original post.

    }

    //Check to see if it was liked by this user first.
    if (!originalBlerb.likes.includes(req.user._id)) {
      originalBlerb.likes.push(req.user._id);
    } else {
      //Send back that this was already liked by the current user.
      errorMessage = "You already liked this post.";
    }


    //Remove duplicate likes just in case.
    originalBlerb.likes = originalBlerb.likes.filter((id, i) =>
      originalBlerb.likes.indexOf(id) === i
    );

    console.log("likes total: ", originalBlerb.likes.length);


    originalBlerb.totalLikes = originalBlerb.likes.length;

    //SAVING 
    try {   //This try catch could also just go around the whole thing.
      await originalBlerb.save();
    } catch (e) {
      return res.status(200).send({
        likedSuccess: false,
        message: 'Unable to like the post at this time.',
        likedBlerb: likedPost
      });
    }

    //Add the total likes to the likedBlerb.
    likedPost.likes = originalBlerb.likes;
    likedPost.totalLikes = originalBlerb.totalLikes;

  } else {
    //This post is NOT a reblerb

    //Checks to see if the user liked it already.
    if (!likedPost.likes.includes(req.user._id)) {
      likedPost.likes.push(req.user._id);
    }

    //Increments the total LIKES.
    const numberOfLikes = likedPost.likes.length;
    likedPost.totalLikes = numberOfLikes;
  }  //end ELSE.

  try {
    //SAVING
    await likedPost.save();

    // console.log("liked post after saving: ", likedPost);
    let populatedLikedPost = await populateName(likedPost, 'author');
    populatedLikedPost = await populateName(likedPost, 'owner');
    //This really needs to happen in a middleware.

    const numberOfLikes = likedPost.likes.length;

    //Send the number of likes instead...
    return res.status(200).send({
      likedSuccess: true,
      message: "Liked the post.",
      likedBlerb: likedPost
    });

  } catch (e) {
    console.log(e);
  }

  return res.status(200).send({
    likedSuccess: false,
    message: 'User already liked the post',
    likedBlerb: likedPost
  });
  // }

  // return res.status(200).send('Sent from /like route');
});

///REBLERB///
router.post('/reblerb', auth, async (req, res) => {

  console.log(chalk.blueBright("Current user: ", req.user._id));
  console.log(chalk.magenta("reblerbed post: ", req.body.postID));

  //Finds the blerb which was reBlerbed - not the original, necessarily.
  const reblerbedPost = await Post.findById(req.body.postID);
  await populateName(reblerbedPost, 'author');
  await populateName(reblerbedPost, 'owner');
  console.log("reblerbedBlerb", reblerbedPost);


  //Find the original blerb if the reblerbed blerb was a reblerb.
  let source;
  if (reblerbedPost.isReblerb === true) {
    let reblerb = await Reblerb.findById(reblerbedPost.reblerbOf);
    source = await Post.findById(reblerb.reblerb);
    await populateName(source, 'author');
    await populateName(source, 'owner');
    console.log("Reblerb: ", reblerb);
  } else {
    source = reblerbedPost;
  }

  //Check to see if the current user already reblerbed this blerb.
  const alreadyReblerbed = await Reblerb.find({
    reblerber: req.user._id,
    reblerb: source._id,
  }).lean();

  console.log("This user alreadyReblerbed: ", alreadyReblerbed);


  //Do nothing  - send error message - if the user reblerbed this already:
  if (alreadyReblerbed.length > 0) {     //Refactor to get mongo to do the work here?
    return res.status(200).send({
      error: "User already reblerbed that blerb."
    })
  }



  //Create the new Reblerb object.
  const newReblerb = new Reblerb({
    reblerber: req.user._id,
    text: source.text,
    author: source.author,
    reblerb: source._id,
  });

  await newReblerb.save();

  //Find all of the existing reblerbs of the original Blerb.
  //Note necessary except as a way to double-check count, sort of.
  const reblerbed = await Reblerb.find({
    reblerb: source._id   //Change to sourceID.
  });
  // console.log("previous reblerbs: ", reblerbed);

  // //Find the count: how many times the original blerbs was reblerbed.
  //        -Apply this to the original
  //        -Apply this to the new post.     
  const reblerbCount = await Reblerb.countDocuments({
    reblerb: source._id,
  });
  console.log("reblerb count: ", reblerbCount);

  reblerbedPost.totalReblerbs = reblerbCount;
  await reblerbedPost.save();

  //Create the new reblerbPost with the current user as owner:
  const newReblerbPost = new Post({
    owner: req.user._id,
    author: source.author,
    text: source.text,
    isReblerb: true,
    reblerbOf: newReblerb._id,
    totalLikes: source.totalLikes,      //I need to handle LIKES
    totalReblerbs: reblerbCount,
  })

  newReblerbPost.save();

  //Populate the post
  let populatedNewReblerbPost = await populateName(newReblerbPost, 'author');
  resultBlerb = await populateName(populatedNewReblerbPost, 'owner');

  //Send the post to the frontend.
  return res.status(200).send(resultBlerb);


});   //End reblerb.

module.exports = router;

