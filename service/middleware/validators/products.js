const { check, validationResult } = require("express-validator");
const validatePostProducts = [
  check("name").exists().notEmpty(),
  check("descripcion").exists().notEmpty(),
  check("price").exists().notEmpty().isNumeric(),
  check("imageId").exists().notEmpty().isMongoId(),
  check("stock").exists().notEmpty().isNumeric(),
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

module.exports = { validatePostProducts }

