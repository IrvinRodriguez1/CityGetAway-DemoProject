const mongoose = require('mongoose');
 const {Schema}=mongoose;
 passportLocalMongoose = require('passport-local-mongoose')
//mongoose.connect('mongodb://localhost:27017/vacation');

const UserSchema = new Schema({
  firstName:String,
  lastName: String,
  avatar: String
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', UserSchema)