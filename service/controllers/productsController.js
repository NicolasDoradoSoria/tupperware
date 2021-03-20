const Products = require("../models/Products");
const getProductByIdFunction = require("../data/getProductByIdFunction")
const { validationResultFunction } = require("../libs/validationResult");
// inserta productos a la BD
exports.postProducts = async (req, res) => {
  validationResultFunction(req)
 
  try {
    const product = new Products(req.body);

    //guardamos el producto
    await product.save();

    res.status(200).send("producto agregado correctamente");
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
    const product = await getProductByIdFunction(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};
 
//actualiza producto por id
exports.updateProductById = async (req, res) => {

  try {
    //si el producto existe o no
    let products = await Products.findById(req.params.productId);
  
    if (!products) {
      return res.status(404).json({ msg: "no existe ese producto" });
    }
    
    const updatedProduct = await Products.findByIdAndUpdate(
      { _id: req.params.productId },
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
    const products = await Products.find();
    //si el producto existe o no
    let product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "no existe ese producto" });
    }
    await Products.findByIdAndDelete(productId);
    
    
    
    res.json({ products });
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

// search de productos
exports.searchProducts = async (req, res) => {
  try {
    const products = await Products.find()
    const productfilter = products.filter(product => product.name.toLowerCase().includes(req.body.name))
    console.log(productfilter)
    res.status(200).json(productfilter);
    
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};
