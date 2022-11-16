import mercadopago from 'mercadopago'
import Cart from '../models/Cart';
import User from '../models/User';
import Order from "../models/Order"
import Products from "../models/Products"
import httpProxy from 'http-proxy'
const proxy = httpProxy.createProxyServer({});

export const createOrder = async (req, res) => {

    // devuelve el usuario logeado
    const user = await User.findById(req.userId).select('-password')

    //devuelve el carrito si es que existe si no existe crea uno
    let cart = await Cart.findOne({ user: user._id }).populate({ path: "products.id", model: "Productos" })

    let preference = {
        items: [],
        back_urls: {
            "success": "http://localhost:4000/api/payment/notification",
            "failure": "http://localhost:4000/api/payment/notification",
            "pending": "http://localhost:4000/api/payment/notification"
        },
        auto_return: "approved",
    };


    cart.products.forEach(product => {
        preference.items.push({
            title: product.id.name,
            quantity: product.quantity,
            currency_id: 'ARS',
            unit_price: product.id.price
        })
    })

    const response = await mercadopago.preferences.create(preference)
    const preferenceId = response.body.id
    await Order.create({
        products: cart.products,
        status: "pending",
        user: { id: user._id },
        orderId: preferenceId
    });
    res.send({ preferenceId })
}

export const feedback = async (req, res) => {
    //  buscar el pedido
    const order = await Order.find({ orderId: req.query.preference_id }).populate({ path: "products.id", model: "Productos" })
    let productsInCart = order[0].products
    // si no existe el pedido finaliza la ejecucion del controllador
    if (!order) res.json({ msg: "el pedido de compra no existe!" })

    // si el estado de la compra esta en aprobado ya no se puede modificar los productos
    // modifico el stock cuando el pago a sido aprobado
    if (order[0].status === "pending") {

        productsInCart.forEach(productInCart => {
            const updateProduct = async () => {
                // busco el producto con el id con el que esta guardado productInCart
                let product = await Products.findById(productInCart.id._id)
                product.stock -= productInCart.quantity
                // actualizo el stock
                await Products.findByIdAndUpdate({ _id: product._id }, product, { new: true, })

            }
            updateProduct()
        })
        // status pasa a hacer aprovado
        order[0].status = "approved"

        // actualizo el status del pedido
        await Order.findByIdAndUpdate({ _id: order[0]._id }, order[0], { new: true, })

        res.redirect("http://localhost:3000/notification");
        // res.json({
        //     Payment: req.query.payment_id,
        //     Status: req.query.status,
        //     MerchantOrder: req.query.merchant_order_id
        // });
    }
    else {
        
        res.redirect("http://localhost:3000/notification");
    }

}
