const Cart = require("../models/Cart");
const User = require("../models/User");

//agrega un pedido al carrito
exports.generateOrder = async (req, res) => {
  const products = req.body.products
  const user = await User.findById(req.userId).select('-password')
  const order = new Cart({user: user._id, products: products});

  try {
    await order.save((resultingOrder) => {
      req.order = resultingOrder
    })
    res.json(order);
  } catch (error) {
    res.status(500).json({msg:'hubo un error'}, error)
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
  
  //aca tengo al usuario
  const order = await Cart.find({user: req.params.idOrder}).populate({ path: "products.id", model: "Productos" });
  if (!order) {
    res.json({ mensaje: "este pedido no existe" });
    return next();
  }

  //mostrar el pedido
  res.json(order);
};

//actualiza un pedido por ID
exports.updateOrder = async (req, res, next) => {
  console.log(req.body)
  try {
    const order = await Cart.findOneAndUpdate(
      { _id: req.params.idOrder },
      req.body,
      { new: true }
    )
      .populate("user")
      .populate({ path: "orders.product", model: "Productos" });

    res.json(order);
  } catch (error) {
    console.log(error);
    next();
  }
};


//elimina un pedido por ID
exports.deleteOrder = async(req, res, next) =>{
  try {
       await Cart.findOneAndDelete({_id: req.params.idOrder})

      res.json({mensaje: "el producto se a eliminado"})
  } catch (error) {
      console.log(error)
      next()
  }
}

