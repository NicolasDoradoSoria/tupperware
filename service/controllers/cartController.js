const Cart = require("../models/Cart");
const User = require("../models/User");
const Products = require("../models/Products");
const updateProduct = require("../data/updateProduct");
//agrega un pedido al carrito
exports.generateOrder = async (req, res) => {
  const { id, quantity, stock } = req.body;

  try {
    const user = await User.findById(req.userId).select('-password')
    let cart = await Cart.findOne({ user: user._id })
    let product = await Products.findById(id)
    if (cart) {
      let itemIndex = cart.products.findIndex(p => p.id == id);
      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex]
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;

      }
      else {
        //product does not exists in cart, add new item
        cart.products.push({ id, quantity });
      }
      product.stock = product.stock - quantity
      updateProduct(product, id)
     
      await cart.save();
      return res.send("el producto a sido agregado correctamente");
    }
    else {
      //no cart for user, create new cart

      await Cart.create({
        user: user._id,
        products: [{ id, quantity }]
      });
      return res.send("el producto a sido agregado correctamente");
    }

  } catch (error) {
    res.status(500).json({ msg: 'hubo un error' }, error)
  }


};

//muestra todos los pedidos
exports.showAllOrders = async (req, res) => {
  try {
    const order = await Cart.find({}).populate("user");
    res.json(order);
  } catch (error) {
    console.log(error);
    next();
  }
};

//muestra un pedido por ID de usuario
exports.showOrder = async (req, res, next) => {
  try {
    const order = await Cart.find({ user: req.params.idUser }).populate({ path: "products.id", model: "Productos" });
    if (order.length == 0) {
      console.log("hola")
      return res.status(404).json({ msg: "no posee pedidos aun" });
    }
    //mostrar el pedido
    res.json(order);

  } catch (error) {
    res.status(500).send("hubo un error");
  }
};


//actualiza un pedido por ID
exports.updateOrder = async (req, res, next) => {
  const orderUser = await Cart.find({ user: req.params.idOrder }).populate({ path: "products.id", model: "Productos" })
  try {
    const order = await Cart.findOneAndUpdate(
      { _id: orderUser[0]._id },
      req.body,
      { new: true }
    )

    res.json(order);
  } catch (error) {
    console.log(error);
    next();
  }
};
//actualiza un pedido por ID
exports.deleteProductOrder = async (req, res, next) => {

  try {
    await Cart.findOneAndUpdate({ user: req.params.idUser },
      { $pull: { products: { _id: req.params.idOrder } } });
    res.json({ msg: "el producto se a eliminado" })

  } catch (error) {
    console.log(error);
    next();
  }
};


//elimina un pedido por ID
exports.deleteOrder = async (req, res, next) => {
  try {
    await Cart.findOneAndDelete({ user: req.params.idUser })

    res.json({ msg: "el carrito fue limpieado correctamente" })
  } catch (error) {
    console.log(error)
    next()
  }
}

