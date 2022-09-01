import {Schema, model} from 'mongoose'

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
      }
    }
  ],
  
  total: {
    type: Number,
  },
});

export default model("Cart", cartSchema);
