const { check } = require("express-validator");
const { validateResult } = require("../../data/validateResult");
const validateGenerateOrder = [
  check("user").exists().notEmpty(),
  check("products").exists().notEmpty().isArray(),
  check("total").exists().notEmpty(),
  (req, res, next) => {
    validateResult (req, res, next);
  },
]

module.exports = { validateGenerateOrder }

