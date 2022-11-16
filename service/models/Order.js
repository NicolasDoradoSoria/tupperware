import { Schema, model } from 'mongoose'

const orderSchema = Schema({

    status: {
        type: String,
    },
    products: [
        {
            id: {
                type: Schema.ObjectId,
                ref: "Productos",
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    user: {
        id: {
            type: Schema.ObjectId,
            ref: "Usuario",
        },
    },

    orderId: {
        type: String
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model('Order', orderSchema)