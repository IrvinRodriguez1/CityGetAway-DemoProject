const mongoose = require('mongoose');
 const {Schema}=mongoose;
//mongoose.connect('mongodb://localhost:27017/vacation');

const CommentSchema = new Schema({
  comment:String,
  cityID: String,
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  rating: Number
})


module.exports = mongoose.model('comment', CommentSchema)