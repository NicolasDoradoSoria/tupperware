import mercadopago from 'mercadopago'
import Order from "../models/Order"
import { ProductRepo, UserRepo, CartRepo, OrderRepo } from "../repositories/Repository"
const productRepo = new ProductRepo()
const userRepo = new UserRepo()
const cartRepo = new CartRepo()
const orderRepo = new OrderRepo()
export const createOrder = async (req, res) => {

    let _id = req.userId
    // devuelve el usuario logeado
    const user = await userRepo.get({ _id }, true)

    const cart = await cartRepo.get({ user: user._id })

    if (!cart) res.json({ msg: "el carrito de compra no existe!" })
    let preference = {
        items: [],
        back_urls: {
            "success": "http://localhost:4000/api/payment/notification",
            "failure": "http://localhost:4000/api/payment/notification",
            "pending": "http://localhost:4000/api/payment/notification"
        },
        auto_return: "approved",
    };


    cart[0].products.forEach(product => {
        preference.items.push({
            title: product.id.name,
            quantity: product.quantity,
            currency_id: 'ARS',
            unit_price: product.id.price
        })
    })

    const response = await mercadopago.preferences.create(preference)
    const preferenceId = response.body.id
    const repo = await orderRepo.create({
        products: cart[0].products,
        status: "pending",
        user: { id: user._id },
        orderId: preferenceId
    });
    
    res.send({ preferenceId, repo })
}

export const feedback = async (req, res) => {

    //  buscar el pedido
    const order = await orderRepo.get({ orderId: req.query.preference_id })
    // si no existe el pedido finaliza la ejecucion del controllador
    if (!order) res.json({ msg: "el pedido de compra no existe!" })

    // si el estado de la compra esta en aprobado ya no se puede modificar los productos
    // modifico el stock cuando el pago a sido aprobado
    if (order[0].status === "pending") {
        let productsInCart = order[0].products

        productsInCart.forEach(productInCart => {
            const updateProduct = async () => {
                let idProductInCart = productInCart.id._id
                // busco el producto con el id con el que esta guardado productInCart
                let product = await productRepo.get({ _id: idProductInCart })
                product.stock -= productInCart.quantity
                // actualizo el stock
                await productRepo.update({ _id: product._id }, product)
            }
            updateProduct()
        })
        // status pasa a hacer aprovado
        order[0].status = "approved"

        // actualizo el status del pedido
        await orderRepo.update({ _id: order[0]._id }, order[0])

        res.redirect(`http://localhost:3000/notification?status=${req.query.status}&payment=${req.query.payment_id}&merchantOrder=${req.query.merchant_order_id}`);
    }
    else {

        res.redirect(`http://localhost:3000/notification?status=${req.query.status}&payment=${req.query.payment_id}&merchantOrder=${req.query.merchant_order_id}`);
    }

}

export const getOrders = async (req, res) => {
    try {
        const order = await orderRepo.get({})
        res.json({ order });
    } catch (error) {
        res.status(500).send("hubo un error");
    }
}