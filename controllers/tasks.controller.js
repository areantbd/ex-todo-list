const mongoose = require('mongoose');
const Task = require("../models/task.model");

module.exports.list = (req, res, next) => {
  Task.find()
    .then((tasks) => res.render("tasks/list", { tasks }))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Task.findById(req.params.id)
    .then((task) => {
      res.render("tasks/detail", { task });
    })
    .catch((error) => next(error));
  // TODO: use Task.findById(id) to get task by id and render task detail
  // Task.findById() returns a promise that resolves with task detail (or undefined if it does not exist)
  //res.send("TODO");
};

module.exports.new = (req, res, next) => {
  res.render("tasks/new");
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
        res.render('tasks/new',  { errors: error.errors, task })
      } else {
        next(error)
      }
    })
  // TODO: use Task.create({...}) to create a new Task and redirect to list
  // Task.create() returns a promise that resolves with created task detail
  //res.send("TODO");
};

module.exports.delete = (req, res, next) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/tasks/new");
    })
    .catch((error) => next(error))
  // TODO: use Task.findByIdAndDelete(id) to delete a task and redirect to list
  // Task.findByIdAndDelete() returns a promise that resolves with undefined
  //res.send("TODO");
};
