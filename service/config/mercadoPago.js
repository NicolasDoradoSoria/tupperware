import { config } from 'dotenv'
import mercadopago from "mercadopago"
config()

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
})

export default {
    mercadopago
}