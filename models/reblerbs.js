const Post = require('./posts.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reblerbSchema = new Schema({
  reblerber: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reblerb: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
}, { timestamps: true });


const Reblerb = mongoose.model('reblerb', reblerbSchema);


module.exports = Reblerb;
