const { check, validationResult } = require("express-validator");
const validateGenerateOrder = [
  check("user").exists().notEmpty(),
  check("products").exists().notEmpty(),
  check("total").exists().notEmpty(),
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

module.exports = { validateGenerateOrder }

