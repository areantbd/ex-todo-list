const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EMAIL_PATTERN = /REGEX/;
const PWD_PATTERN = /.*{8,}/;

const userSchema = new Schema({
   name: {
    type: String,
    required: 'Insert a name',
    maxLength: [20, 'Too long name, max 20 chars'],
    trim: true
   },
   email:{
    type: String,
    required: 'Insert an e-mail',
    trim: true,
    lowercase: true,
    unique: true,
    match: [EMAIL_PATTERN, 'Invalid email']
   },
   password: {
    type: String,
    required: 'Insert an e-mail',
    match: [PWD_PATTERN, 'Password needs at least 8 chars']
   }
  });

  const User = mongoose.model("User", userSchema);

module.exports = User;