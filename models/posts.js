const User = require('./user');
const mongoose = require('mongoose');
const Reblerb = require('./reblerbs');
const { schema } = require('./reblerbs');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isReblerb: Boolean,
  reblerbOf: {
    type: Schema.Types.ObjectId,
    ref: Reblerb
  },
  totalLikes: {
    type: Number,
    default: 0
  },
  totalReblerbs: {
    type: Number,
    default: 0
  },
  // reblerbs: [{
  //   reblerber: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User'
  //   },
  //   reblerbedAt: Date
  // }],
}, { timestamps: true })




const Post = mongoose.model('post', postSchema);

module.exports = Post;


// [ ] Use schema.post('find') to populate the auther field with the name.
// [ ] Refactor postSchema and Post Model to Blerb


// [x]     -Create the Mongoose models for posts.
// [x]     Save with message
// [x]     Add timestamp.
// [x]     Add ref Link to user.

//LATER
// [ ]     After this works use:      
// [ ]         -Stars: an array of users that have "liked" it.
//             -...also, Reply, Retweet?

// postSchema.pre('find', async function (result, next) {
//   console.log("Inside middleware");

//   console.log("result: ", result);
//   console.log("this: ", this);
//   // console.log("err: ", err);
//   // console.log("next: ", next);

//   // console.log("this: ", this);


//   await result.populate({
//     path: 'author',
//     model: User,
//     select: 'name'
//   })
//     .execPopulate().then(() => next());

//   // console.log("this: ", this);
//   // return this;

//   next();
// })