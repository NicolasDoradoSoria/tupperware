const { check } = require("express-validator");
const { validateResult } = require("../../data/validateResult");

const validatePostProducts = [
  check("name").exists().notEmpty(),
  check("descripcion").exists().notEmpty(),
  check("price").exists().notEmpty().isNumeric(),
  check("imageId").exists().notEmpty().isMongoId(),
  check("stock").exists().notEmpty().isNumeric(),
  (req, res, next) => {
    validateResult (req, res, next);
  },
]

module.exports = { validatePostProducts }

