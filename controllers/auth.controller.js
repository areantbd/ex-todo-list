const mongoose = require("mongoose");
const { User } = require("../models");
const app = require('express')

module.exports.register = (req, res, next) => {
  res.render("auth/register", { title: 'Register'});
};

module.exports.doRegister = (req, res, next) => {

    function renderWithErrors(errors) {         /* <== ---- FUNCIÓN PARA RENDERIZAR ERRORES EN GENERAL ---------*/
        res.status(400).render("auth/register", {                                       ////RENDERIZO DE NUEVO LA PÁGINA
            user: req.body,                                                 ////COMO VALOR TENGO LO QUE EL USUSARIO HA ESCRITO
            errors                                                          ////Y EL MENSAJE DE ERROR
            });
    }

    const { email } = req.body;
    User.findOne({ email })                                                 ////BUSCAMOS SI HAY USUARIO CREADO
    .then((user) => {
      if (user) {                                                           //// SI YA EXISTE
        renderWithErrors ({ email: 'Email already exists'})                 ////LLAMO A LA FUNCIÓN DE ARRIBA Y LE PASO MENSAJE DE ERROR FORZADO POR MI
      } else {  
        const user = req.body                
        return User.create(user)                                            ////SI NO LO HAY LO CREO ¡¡¡¡OJO AL RETURN!!!!
            .then((user) => res.redirect("/login"));
      }
    })
    .catch((error) => {                                                     ////EN CASO DE ERROR
      if (error instanceof mongoose.Error.ValidationError) {                ////SI EL ERROR ES DE VALIDACION PINTO DE NUEVO LA PÁGINA Y SE LO PASO
        renderWithErrors(error.errors)                                      ////LLAMO A LA FUNCIÓN PASÁNDOLE LOS ERRORES
      } else {
        next(error);                                                        ////SI NO VOY POR ERRORES EN APP.JS
      }
    });
};

module.exports.login = (req, res, next) => {
    res.render('auth/login', { title: 'Login'})
}

module.exports.doLogin = (req, res, next) => {

  function renderInvalidLogin() {
    res.status(400).render('auth/login', {
      user: req.body,
      errors: { password: 'Invalid email or password' }
    })
  }

  const { email, password } = req.body
  User.findOne({ email })
  .then( user => {
    if (!user) {
      renderInvalidLogin()
    } else {
      return user.checkPassword(password)
        .then(match => {
          if (match) {
            req.session.userId = user.id;
            res.redirect('/tasks')
          } else {
          renderInvalidLogin()
          }
        })
      }
    })
  .catch(error => next(error))
}

module.exports.viewUsers  = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render('auth/users', { users, title: 'Users' })
    })
}

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/users");
    })
    .catch((error) => next(error))
};

module.exports.deleteAll = (req, res, next) => {
  User.deleteMany()
    .then(() => {
      res.redirect('/register')
    })
    .catch((error) => next(error))
}