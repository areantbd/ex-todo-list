const express = require("express");
const router = express.Router();
const { tasks, auth } = require('../controllers')

    router.get('/tasks', tasks.list)
    router.get('/tasks/new', tasks.new)
    router.get('/tasks/:id', tasks.detail)
    router.post('/tasks', tasks.create)
    router.post('/tasks/:id/delete', tasks.delete)
    router.post('/tasks/deleteAll', tasks.deleteAll)
    
    router.get('/register', auth.register)
    router.post('/register', auth.doRegister)

    router.get('/login', auth.login)
    router.post('/login', auth.doLogin)

module.exports = router;