const { User } = require("../models");
const expressSession = require("express-session");

const session = expressSession({
  secret: process.env.SESSION_SECRET || "super secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.SESSION_SECURE === "true",
    httpOnly: true,
  },
});

const loadUser = (req, res, next) => {
  const { userId } = req.session;
  User.findById(userId)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => next(error));
};

module.exports = {
    session,
    loadUser
}
