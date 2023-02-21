import shortid from 'shortid'
import { ProductRepo, CategoryRepo } from "../repositories/Repository"
const productRepo = new ProductRepo()
const categoryRepo = new CategoryRepo()

// agrega un producto
export const postProducts = async (req, res) => {

  try {
    let product = req.body
    const { category } = req.body
    let images = [];

    const categorySearch = await categoryRepo.get({ category });

    if (!categorySearch) return res.status(400).send("Invalid Category");

    if (req.files.images.length > 0) {

      req.files.images.forEach(element => {
        images.push({
          _id: shortid.generate(),
          fileName: element.filename,
          filePath: element.path,
        });
      });
    }
    if (product.checkedOffer === "false") product.originalPrice = product.price
    

    product.images = images
    const newProduct = await productRepo.create(product)

    if (!newProduct) return res.json({ msg: "no se a podido crear el producto" });


    res.json({ msg: "se a agregado el producto correctamente" });

  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

// devuelve todos los productos
export const getProducts = async (req, res) => {

  try {
    let filter = {};

    if (req.query.id) {
      filter = { category: req.query.id.split(",") };
    }

    const products = await productRepo.getProductByCategory(filter)
    res.json({ products });
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//devuelve producto por id
export const getProductById = async (req, res) => {
  try {
    const _id = req.params.productId

    const product = await productRepo.getProductByCategory({ _id })
    res.status(200).json(product[0]);
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//actualiza producto por id
export const updateProductById = async (req, res) => {

  const { productId } = req.params
  try {
    const product = await productRepo.get({ productId });

    //si el producto existe o no
    if (!product) {
      return res.status(404).json({ msg: "no existe ese producto" });
    }
    const updatedProduct = await productRepo.update(productId, req.body)

    if (!updatedProduct) return res.status(400).send("the product cannot be updated");

    res.status(200).json({ msg: "se a actualizado correctamente" });
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//elimina producto por id
export const deleteProductById = async (req, res) => {

  try {
    const _id = req.params.productId
    const product = await productRepo.get({ _id });
    //si el producto existe o no
    if (!product[0]) {
      return res.status(404).json({ msg: "no existe ese producto" });
    }
    const deletedProduct = await productRepo.delete(_id)

    if (!deletedProduct) {
      return res.status(404).json({ msg: "no se a podido eliminar el producto" });
    }

    res.json({ msg: "se a eliminado el producto correctamente" });
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

// search de productos
export const searchProducts = async (req, res) => {
  try {
    const products = await productRepo.get();

    if (!req.body.name) {
      return res.status(200).json(products);
    }
    const productfilter = products.filter(product => product.name.toLowerCase().includes(req.body.name))
    res.status(200).json(productfilter);

  } catch (error) {
    res.status(500).send("hubo un error");
  }
};