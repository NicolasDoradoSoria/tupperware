const {userModel, cartModel, productsModel} = require("../models")
const updateProduct = require("../data/updateProduct");
//agrega un pedido al carrito

const generateOrder = async (req, res) => {
  const { id, quantity} = req.body;

  try {
    const user = await userModel.findById(req.userId).select('-password')
    console.log(user)
    let cart = await cartModel.findOne({ user: user._id })
    let product = await productsModel.findById(id)
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
      
      await cartModel.create({
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
const showAllOrders = async (req, res) => {
  try {
    const order = await cartModel.find({}).populate("user");
    res.json(order);
  } catch (error) {
    console.log(error);
    next();
  }
};

//muestra un pedido por ID de usuario
const showOrder = async (req, res) => {
  try {
    const order = await cartModel.find({ user: req.params.idUser }).populate({ path: "products.id", model: "Productos"})
     
    if (order.length == 0) {
      return res.status(404).json({ msg: "no posee pedidos aun" });
    }
    //mostrar el pedido
    res.json(order);

  } catch (error) {
    res.status(500).send("hubo un error");
  }
};


//actualiza un pedido por ID
const updateOrder = async (req, res, next) => {
  const orderUser = await cartModel.find({ user: req.params.idOrder }).populate({ path: "products.id", model: "Productos"
 })
  try {
    const order = await cartModel.findOneAndUpdate(
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
const deleteProductOrder = async (req, res, next) => {

  try {
    await cartModel.findOneAndUpdate({ user: req.params.idUser },
      { $pull: { products: { _id: req.params.idOrder } } });
    res.json({ msg: "el producto se a eliminado" })

  } catch (error) {
    console.log(error);
    next();
  }
};


//elimina un pedido por ID
const deleteOrder = async (req, res, next) => {
  try {
    await cartModel.findOneAndDelete({ user: req.params.idUser })

    res.json({ msg: "el carrito fue limpieado correctamente" })
  } catch (error) {
    console.log(error)
    next()
  }
}

module.exports = {deleteOrder, deleteProductOrder, updateOrder, showOrder, showAllOrders, generateOrder}