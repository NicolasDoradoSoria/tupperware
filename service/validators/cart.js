import { check } from "express-validator"
import { validateResult } from "../data/validateResult"
export const validateGenerateOrder = [
  check("user").exists().notEmpty(),
  check("products").exists().notEmpty().isArray(),
  check("total").exists().notEmpty(),
  (req, res, next) => {
    validateResult (req, res, next);
  },
]


