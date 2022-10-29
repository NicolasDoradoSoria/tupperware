import Category from "../models/Category"
import Products from "../models/Products"
import { getProductsfunction } from "../data/controllerFunction"
import shortid from 'shortid'

// inserta productos a la MongoDB
export const postProducts = async (req, res) => {

  try {
    const { name, descripcion, date, price, stock, category } = req.body
    let images = [];

    const categorySearch = await Category.findById(category);
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

    const product = new Products({ name, descripcion, date, price, stock, images, category });

    // guardamos el producto
    await product.save();
    // ----------
    // consultamos los productos disponibles
    const products = await getProductsfunction(req, res)

    res.json({ products, msg: "se a eliminado el producto correctamente" });

  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};


// devuelve todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await getProductsfunction(req, res)
    res.json({ products });
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//devuelve producto por id
export const getProductById = async (req, res) => {

  try {
    const product = await Products.findById(req.params.productId).populate({ path: "imageId", model: "ProductImages" }).populate("category");
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//actualiza producto por id
export const updateProductById = async (req, res) => {

  const { productId } = req.params
  try {
    //si el producto existe o no
    let product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "no existe ese producto" });
    }

    await Products.findByIdAndUpdate(
      { _id: productId },
      req.body,
      {
        new: true,
      }
    )
    // ----------
    // consultamos los productos disponibles GET PRODUCT TD: CORREGIR REFACTORIZAR CON LA OTRA FUNCION
    const products = await getProductsfunction(req, res)
    res.json({ products });

    res.status(200).json({ products, msg: "se a actualizado correctamente" });
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};


//elimina producto por id
export const deleteProductById = async (req, res) => {

  try {
    const { productId } = req.params;

    const products = await Products.find();
    //si el producto existe o no
    let product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "no existe ese producto" });
    }
    await Products.findByIdAndDelete(productId);

    res.json({ products, msg: "se a eliminado el producto correctamente" });
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

// search de productos
export const searchProducts = async (req, res) => {
  try {
    const products = await Products.find()
    if (!req.body.name) {
      return res.status(200).json(products);
    }
    const productfilter = products.filter(product => product.name.toLowerCase().includes(req.body.name))
    res.status(200).json(productfilter);

  } catch (error) {
    res.status(500).send("hubo un error");
  }
};