import { validateResult } from "../../data/validateResult"
import { check } from "express-validator"

export const validateCategory = [
    check("name").exists().notEmpty(),
  
    (req, res, next) => {
      validateResult (req, res, next);
    },
  ]
  