const User = require('../models/user');

async function populateNames(posts, field) {

  for (let i = 0; i < posts.length; i++) {
    await posts[i]
      .populate({
        path: field,
        model: User,
        select: 'name'
      })
      .execPopulate();
  }
  return posts;
}


async function populateName(post, field) {
  await post
    .populate({
      path: field,
      model: User,
      select: 'name'
    })
    .execPopulate();

  return post;
}

module.exports = { populateName, populateNames };