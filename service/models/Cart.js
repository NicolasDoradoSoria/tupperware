const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = mongoose.Schema({
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
      },
      name: {
        type: String,
      },
      
    }
  ],
  total: {
    type: Number,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
