const express = require("express");
const router = express.Router();
const task = require('../controllers/tasks.controller')

    router.get('/tasks', task.list)
    router.get('/tasks/new', task.new)
    router.get('/tasks/:id', task.detail)
    router.get('/register/register', task.register)
    router.post('/tasks', task.create)
    router.post('/tasks/:id/delete', task.delete)

module.exports = router;