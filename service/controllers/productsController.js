const { validationResult } = require("express-validator");
const Products = require("../models/Products");
// inserta productos a la BD
exports.postProducts = async (req, res) => {
  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const products = new Products(req.body);

    //guardamos el proyecto
    products.save();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

exports.getProducts = async (req, res) => {
  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const products = await Products.find()
    res.json({ products });
  } catch (error) {
    next(err);
    res.status(500).send("hubo un error");
  }
};
