
module.exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.user.admin) {
        next()
    } else {
        res.redirect('/tasks')
    }
}