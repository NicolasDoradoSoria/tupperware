import mercadopago from 'mercadopago'

export const createOrder = async (req, res) => {
    mercadopago.configure({
        access_token: 'TEST-4816854471643137-110418-711e964a660c656dc34c3f7948cc4d8d-1231977839'
    });

    var preference = {
        items: [
            {
                title: 'Pelota',
                quantity: 1,
                currency_id: 'ARS',
                unit_price: 10.5
            }
        ],
        notification_url: "https://78b4-2800-810-458-107-d8bf-1320-f2bb-c302.sa.ngrok.io/api/payment/notificacion"
    };

    mercadopago.preferences.create(preference)
        .then((r) => {
            res.json(r)
        })
        .catch((e) => {
            console.log(e)
        })
}

export const notificationOrder = async (req, res) => {
    console.log("funca?")
    const data = req.query

    console.log(data)

    res.status(200)
}