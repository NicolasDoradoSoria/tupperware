import { check } from "express-validator"
import { validateResult } from "../data/validateResult"

export const validateRegister = [
  check("firstName").exists().notEmpty().isLength({min: 3, max: 20}).withMessage("el nombre tiene que ser de 3 a 20 caracteres!"),
  check("lastName").exists().notEmpty(),
  check('email', 'agrega un email valido').isEmail().exists(),
  check('password', 'el password debe ser minimo de 6 caracteres').isLength({min: 6}).exists(),
  check('confirmPassword', 'el password debe ser minimo de 6 caracteres').isLength({min: 6}).exists(),
  check("dni").exists().notEmpty().isNumeric(),
  check("cp").exists().notEmpty(),
  check("phone").exists().notEmpty(),
  check("alternativePhone").exists().notEmpty(),
  check("gender").exists().notEmpty(),

  (req, res, next) => {
    validateResult (req, res, next);
  },
]

export const validateLogin = [
  check("email", "agrega un email valido").isEmail(),

  (req, res, next) => {
    validateResult (req, res, next);
  },
]

