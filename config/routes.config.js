const express = require("express");
const router = express.Router();
const task = require('../controllers/tasks.controller')
const user = require('../controllers/autentication.controller')

    router.get('/tasks', task.list)
    router.get('/tasks/new', task.new)
    router.get('/tasks/:id', task.detail)
    router.get('/register/register', user.register)
    router.post('/tasks', task.create)
    router.post('/tasks/:id/delete', task.delete)
    router.post('/register/created', user.create)

module.exports = router;