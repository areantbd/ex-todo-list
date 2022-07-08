const mongoose = require("mongoose");
const User = require("../models/user.model");

module.exports.register = (req, res, next) => {
  res.render("register/register");
};

module.exports.create = (req, res, next) => {
  const user = req.body;

  User.create(user)
    .then((user) => {
      res.render("register/created", { user });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.error(error);
        res.render("register/register", { errors: error.errors, user });
      } else {
        next(error);
      }
    });
};

