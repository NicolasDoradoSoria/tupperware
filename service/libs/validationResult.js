const { validationResult } = require("express-validator");

exports.validationResultFunction = async (req, res, next) => {
  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  
};
