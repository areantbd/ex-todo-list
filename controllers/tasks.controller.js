const mongoose = require('mongoose');
const { Task } = require("../models");

module.exports.list = (req, res, next) => {
  //console.log(req.user)
  Task.find()
    .then((tasks) => res.render("tasks/list", { tasks, title: 'Tasks' }))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Task.findById(req.params.id)
    .then((task) => {
      res.render("tasks/detail", { task, title: 'Detail' });
    })
    .catch((error) => next(error));
};

module.exports.new = (req, res, next) => {
  res.render("tasks/new", { title: 'New task' });
};

module.exports.create = (req, res, next) => {
  const task = req.body;

  Task.create(task)
    .then((task) => {
      res.redirect("/tasks");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.error(error)
        res.render('tasks/new',  { errors: error.errors, task})
      } else {
        next(error)
      }
    })
};

module.exports.delete = (req, res, next) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/tasks");
    })
    .catch((error) => next(error))
};

module.exports.deleteAll = (req, res, next) => {
  Task.deleteMany()
    .then(() => {
      res.redirect('/tasks')
    })
    .catch((error) => next(error))
}
