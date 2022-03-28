const { check, validationResult } = require("express-validator");

const validateRegister = [
  check("firstName").exists().notEmpty(),
  check("lastName").exists().notEmpty(),
  check('email', 'agrega un email valido').isEmail(),
  check('password', 'el password debe ser minimo de 6 caracteres').isLength({min: 6}),
  check("roles").exists().notEmpty(),
  check("dni").exists().notEmpty(),
  check("cp").exists().notEmpty(),
  check("phone").exists().notEmpty(),
  check("alternativePhone").exists().notEmpty(),
  check("gender").exists().notEmpty(),

  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      res.status(403)
      res.send({ errors: err.array() })
    }
  },
]

const validateLogin = [
  check("email", "agrega un email valido").isEmail(),

  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (err) {
      res.status(403)
      res.send({ errors: err.array() })
    }
  },
]

module.exports = { validateRegister, validateLogin }

