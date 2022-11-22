import { matchedData } from "express-validator"
import { CartRepo, UserRepo, ProductRepo } from "../repositories/Repository"
const cartRepo = new CartRepo()
const userRepo = new UserRepo()
const productRepo = new ProductRepo()

//agrega un pedido al carrito
export const generateOrder = async (req, res) => {
  const body = matchedData(req)
  const { id, quantity } = body.products[0];
  try {
    // devuelve el usuario logeado
    const userId = req.userId
    const user = await userRepo.get({ _id: userId }, true)
    //devuelve el carrito si es que existe si no existe crea uno
    let cart = await cartRepo.get({ user: user._id })[0]

    //devuelve el producto que se va a agregar al carrito
    let product = await productRepo.get({ id })


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


      await cart.save();
      return res.json({ msg: "el producto a sido agregado correctamente" });
    }
    else {
      //no cart for user, create new cart
      const newCart = cartRepo.create({
        user: user._id,
        products: [{ id, quantity }]
      })

      if (!newCart) return res.json({ msg: "no se a podido crear el producto" });

      return res.json({ msg: "el producto a sido agregado correctamente" });
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'hubo un error' })
  }

};

//muestra un carrito por ID de usuario
export const getCart = async (req, res) => {
  try {

    const cart = await cartRepo.get({ user: req.params.idUser })

    if (cart.length == 0) return res.status(404).json({ msg: "el carrito no a sido creado" })
    //mostrar el carrito
    res.json(cart);

  } catch (error) {
    res.status(500).json({ msg: 'hubo un error' })
  }
};


//actualiza el carrito por ID
export const updateCart = async (req, res) => {
  const cart = await cartRepo.get({ user: req.params.idCart })

  try {
    const updatedCart = await cartRepo.update(cart[0]._id, req, body)

    res.json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'hubo un error' })
  }
};
//elimina un producto por ID del carrito
export const deleteProductCart = async (req, res) => {
  const { idUser, idCart } = req.params

  try {
    const deletedcart = await cartRepo.deleteProductCart(idUser, idCart)
    if (!deletedcart) return res.json({ msg: "el producto del carrito no se a podido eliminar" })

    res.json({ msg: "el producto se a eliminado" })

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'hubo un error' })
  }
};


//elimina todos los productos del carrito por ID
export const deleteOrder = async (req, res) => {
  try {
    const user = req.params.idUser
    await cartRepo.delete(user)
    
    res.json({ msg: "el carrito fue limpieado correctamente" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'hubo un error' })
  }
}
