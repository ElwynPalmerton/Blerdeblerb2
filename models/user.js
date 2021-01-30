const Post = require('./posts.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  bio: {
    type: String,
    default: "",
  },
  password: String,
  token: String,
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  reblerbs: [{                      //This is unnecessary. I can delete this.
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  avatar: {
    type: Buffer,
  }
})

//VIRTUAL
//Creates an array of all the posts made by this user.
userSchema.virtual('virtualPosts', {
  ref: 'Post',
  //Looks for the localField from this schema in the refSchema's foreighn Field
  localField: '_id',
  //Find the value indicated in the localfield (the user's _id)
  foreignField: 'owner',
  //... on the foreign field. The post's author.
}, { toJSON: { virtuals: true } })

// userSchema.virtual('reblerbs', {
//   ref: 'Reblerb',
//   //Looks for the localField from this schema in the refSchema's foreighn Field
//   localField: '_id',
//   //Find the value indicated in the localfield (the user's _id)
//   foreignField: 'reblerber',
//   //... on the foreign field. The post's author.
// }, { toJSON: { virtuals: true } })

// posts: [{
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Post'
// }]


const User = mongoose.model('user', userSchema);


module.exports = User;


// const PersonSchema = new Schema({
//   name: String,
//   band: String
// });

// const BandSchema = new Schema({
//   name: String
// });

// BandSchema.virtual('members', {
//   ref: 'Person', // The model to use
//   localField: 'name', // Find people where `localField`
//   foreignField: 'band', // is equal to `foreignField`
//   // If `justOne` is true, 'members' will be a single doc as opposed to
//   // an array. `justOne` is false by default.
//   justOne: false,
//   options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
// });


// const stories = Story.find().sort({ name: 1 }).populate({
//   path: 'fans',
//   options: { limit: 2 }
// });
