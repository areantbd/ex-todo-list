const bcrypt = require('bcryptjs')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_PATTERN = /.{8,}$/;
const WORK_FACTOR = 10;

const userSchema = new Schema({
  name: {
    type: String,
    required: "User name is required",
    maxLength: [20, "Too long name, max 20 chars"],
    trim: true,
  },
  email: {
    type: String,
    required: "Email is required",
    trim: true,
    lowercase: true,
    unique: true,
    match: [EMAIL_PATTERN, "Invalid email"],
  },
  password: {
    type: String,
    required: "Password is required",
    match: [PWD_PATTERN, "Password needs at least 8 chars"],
  },
});


userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, WORK_FACTOR)
      .then(hash => {
        this.password = hash
        next()
      })
      .catch(error => next(error))
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
