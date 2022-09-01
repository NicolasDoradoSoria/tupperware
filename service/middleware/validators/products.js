import { check } from "express-validator"
import { validateResult } from "../../data/validateResult"

const validatePostProducts = [
  check("name").exists().notEmpty(),
  check("descripcion").exists().notEmpty(),
  check("price").exists().notEmpty().isNumeric(),
  check("stock").exists().notEmpty().isNumeric(),
  (req, res, next) => {
    validateResult (req, res, next);
  },
]

module.exports = { validatePostProducts }

