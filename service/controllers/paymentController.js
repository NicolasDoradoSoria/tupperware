import mercadopago from 'mercadopago'
import Cart from '../models/Cart';
import User from '../models/User';

export const createOrder = async (req, res) => {

    // devuelve el usuario logeado
    const user = await User.findById(req.userId).select('-password')

    //devuelve el carrito si es que existe si no existe crea uno
    let cart = await Cart.findOne({ user: user._id }).populate({ path: "products.id", model: "Productos" })

    let preference = {
        items: [],
        back_urls: {
            "success": "http://localhost:3000/notification",
            "failure": "http://localhost:3000/notification",
            "pending": "http://localhost:3000/notification"
        },
        auto_return: "approved",
        // notification_url: "https://78b4-2800-810-458-107-d8bf-1320-f2bb-c302.sa.ngrok.io/api/payment/notificacion"
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
    res.send({ preferenceId })
}

export const feedback = (req, res) => {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
};
