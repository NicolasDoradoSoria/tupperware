import User from '../models/User'
import Cart from '../models/Cart'
import Products from '../models/Products'
import { matchedData } from "express-validator"
//agrega un pedido al carrito

export const generateOrder = async (req, res) => {
  const body = matchedData(req)
  const { id, quantity } = body.products[0];
  try {
    // devuelve el usuario logeado
    const user = await User.findById(req.userId).select('-password')

    //devuelve el carrito si es que existe si no existe crea uno
    let cart = await Cart.findOne({ user: user._id })

    //devuelve el producto que se va a agregar al carrito
    let product = await Products.findById(id)

    if (!product) return res.status(404).json({ msg: "el producto no existe" });


    // si existe un carrito 
    if (cart) {
      let itemIndex = cart.products.findIndex(product => product.id == id);
      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex]
        productItem.quantity += quantity;
        cart.products[itemIndex] = productItem;
      }
      else {
        //product does not exists in cart, add new item
        cart.products.push({ id, quantity });
      }
      product.stock = product.stock - quantity

      await Products.findByIdAndUpdate({ _id: id }, product, { new: true, })

      await cart.save();
      return res.json({ msg: "el producto a sido agregado correctamente" });
    }
    else {
      //no cart for user, create new cart

      await Cart.create({
        user: user._id,
        products: [{ id, quantity }]
      });
      return res.json({ msg: "el producto a sido agregado correctamente" });
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'hubo un error' })
  }

};

//muestra todos los pedidos
export const showAllOrders = async (req, res) => {
  try {
    const order = await Cart.find({}).populate("user");
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'hubo un error' })
  }
};

//muestra un pedido por ID de usuario
export const showOrder = async (req, res) => {
  try {
    const order = await Cart.find({ user: req.params.idUser }).populate({ path: "products.id", model: "Productos" })

    if (order.length == 0) return res.status(404).json({ msg: "no posee pedidos aun" })
    //mostrar el pedido
    res.json(order);

  } catch (error) {
    res.status(500).json({ msg: 'hubo un error' })
  }
};


//actualiza un pedido por ID
export const updateOrder = async (req, res) => {
  const orderUser = await Cart.find({ user: req.params.idOrder }).populate({ path: "products.id", model: "Productos" })

  try {
    const order = await Cart.findOneAndUpdate(
      { _id: orderUser[0]._id }, req.body, { new: true }
    )

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'hubo un error' })
  }
};
//actualiza un pedido por ID
export const deleteProductOrder = async (req, res) => {

  try {
    await Cart.findOneAndUpdate({ user: req.params.idUser },
      { $pull: { products: { _id: req.params.idOrder } } });
    res.json({ msg: "el producto se a eliminado" })

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'hubo un error' })
  }
};


//elimina un pedido por ID
export const deleteOrder = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.params.idUser })

    res.json({ msg: "el carrito fue limpieado correctamente" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'hubo un error' })
  }
}
