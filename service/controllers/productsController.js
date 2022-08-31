const { productsModel, categoryModel } = require("../models");
const updateProduct = require("../data/updateProduct");
const shortid = require('shortid');


// inserta productos a la MongoDB
const postProducts = async (req, res) => {

  try {
    const { name, descripcion, date, price, stock, category } = req.body
    let images = [];

    const categorySearch = await categoryModel.findById(category);
    if (!categorySearch) return res.status(400).send("Invalid Category");

    if (req.files.images.length > 0) {

      req.files.images.forEach(element => {
        images.push({
          _id: shortid.generate(),
          fileName: element.filename,
          filePath: element.path,
          lastModified: element.lastModified
        });
      });

    }
    const product = new productsModel({ name, descripcion, date, price, stock, images, category });

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
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    const products = await productsModel.find(filter).populate({ path: "imageId", model: "ProductImages" }).populate("category");
    res.json({ products });

  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//devuelve producto por id
const getProductById = async (req, res) => {

  try {
    const product = await productsModel.findById(req.params.productId).populate({ path: "imageId", model: "ProductImages" })
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//actualiza producto por id
const updateProductById = async (req, res) => {

  const { productId } = req.params
  try {
    //si el producto existe o no
    let products = await productsModel.findById(productId);

    if (!products) {
      return res.status(404).json({ msg: "no existe ese producto" });
    }
    updateProduct(req.body, productId)

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

module.exports = { searchProducts, deleteProductById, updateProductById, getProductById, getProducts, postProducts }