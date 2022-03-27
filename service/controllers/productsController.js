const { productsModel } = require("../models");
const getProductByIdFunction = require("../data/getProductByIdFunction")
const shortid = require('shortid');
const updateProduct = require("../data/updateProduct");

// inserta productos a la MongoDB
const postProducts = async (req, res) => {
  try {

    let imagesArray = [];
    req.files.forEach(element => {
      const image = {
        _id: shortid.generate(),
        fileName: element.filename,
        filePath: element.path,
      }
      imagesArray.push(image);
    });

    const product = new productsModel({
      ...req.body,
      files: imagesArray
    });
    // guardamos el producto
    await product.save();


    res.status(200).send("producto agregado correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

// devuelve todos los productos
const getProducts = async (req, res) => {


  try {
    const products = await productsModel.find();
    res.json({ products });

  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//devuelve producto por id
const getProductById = async (req, res) => {
  
  try {
    const product = await getProductByIdFunction(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//actualiza producto por id
const updateProductById = async (req, res) => {

  try {
    //si el producto existe o no
    let products = await productsModel.findById(req.params.productId);

    if (!products) {
      return res.status(404).json({ msg: "no existe ese producto" });
    }
    updateProduct(req.body, req.params.productId)

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};


//elimina producto por id
const deleteProductById = async (req, res) => {

  try {
    const { productId } = req.params;
    const products = await productsModel.find();
    //si el producto existe o no
    let product = await productsModel.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "no existe ese producto" });
    }
    await productsModel.findByIdAndDelete(productId);



    res.json({ products });
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

// search de productos
const searchProducts = async (req, res) => {
  try {
    const products = await productsModel.find()
    if (!req.body.name) {
      return res.status(200).json(products);
    }
    const productfilter = products.filter(product => product.name.toLowerCase().includes(req.body.name))
    res.status(200).json(productfilter);

  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

module.exports = {searchProducts, deleteProductById, updateProductById, getProductById, getProducts, postProducts}