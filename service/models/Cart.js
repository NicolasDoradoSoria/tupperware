import { Schema, model } from 'mongoose'

const cartSchema = Schema({
  user: {
    type: Schema.ObjectId,
    ref: "Usuario",
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
      },
      price: {
        type: Number,
      }
    }
  ],
  total: {
    type: Number,
    default: 0,
  },
  subtotal: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  }

}, {
  versionKey: false

});

export default model("Cart", cartSchema);
