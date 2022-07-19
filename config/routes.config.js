const express = require("express");
const router = express.Router();
const { tasks, auth } = require('../controllers')
const secure =require('../middlewares/secure.mid')
const isUser = secure.isAuthenticated
const isAdmin = secure.isAdmin

    router.get('/tasks', tasks.list)
    router.get('/tasks/new', isUser, tasks.new)
    router.get('/tasks/:id', isUser, tasks.detail)
    router.post('/tasks', tasks.create)
    router.post('/tasks/:id/delete', isUser, tasks.delete)
    router.post('/tasks/deleteAll', isAdmin,  tasks.deleteAll)
    
    router.get('/register', auth.register)
    router.post('/register', auth.doRegister)

    router.get('/login', auth.login)
    router.post('/login', auth.doLogin)

    router.get('/users', isAdmin, auth.viewUsers)
    router.post('/auth/:id/delete', auth.delete)
    router.post('/auth/deleteAll', auth.deleteAll)

module.exports = router;