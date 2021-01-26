const Products = require("../models/Products");
const { validationResultFunction } = require("../libs/validationResult");
// inserta productos a la BD
exports.postProducts = async (req, res) => {
  validationResultFunction(req)
 
  try {
    const product = new Products(req.body);

    //guardamos el proyecto
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

// devuelve todos los productos
exports.getProducts = async (req, res) => {
  validationResultFunction(req)
  try {
    const products = await Products.find();
    res.json({ products });
  } catch (error) {
    next(err);
    res.status(500).send("hubo un error");
  }
};

//devuelve producto por id
exports.getProductById = async (req, res) => {
  validationResultFunction(req)
  try {
    const product = await Products.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//actualiza producto por id
exports.updateProductById = async (req, res) => {
  validationResultFunction(req)
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//elimina producto por id
exports.deleteProductById = async (req, res) => {
  validationResultFunction(req)

  try {
    const { productId } = req.params;
    await Products.findByIdAndDelete(productId);
    res.status(204).json();
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

