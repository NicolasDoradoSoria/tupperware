const { check } = require("express-validator");
const { validateResult } = require("../../data/validateResult");

const validateRegister = [
  check("firstName").exists().notEmpty(),
  check("lastName").exists().notEmpty(),
  check('email', 'agrega un email valido').isEmail(),
  check('password', 'el password debe ser minimo de 6 caracteres').isLength({min: 6}),
  check("dni").exists().notEmpty(),
  check("cp").exists().notEmpty(),
  check("phone").exists().notEmpty(),
  check("alternativePhone").exists().notEmpty(),
  check("gender").exists().notEmpty(),

  (req, res, next) => {
    validateResult (req, res, next);
  },
]

const validateLogin = [
  check("email", "agrega un email valido").isEmail(),

  (req, res, next) => {
    validateResult (req, res, next);
  },
]

module.exports = { validateRegister, validateLogin }

