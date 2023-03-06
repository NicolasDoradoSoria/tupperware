import { Schema, model } from 'mongoose'

const favoriteSchema = Schema({
  user: {
    type: Schema.ObjectId,
    ref: "Usuario",
  },
  favoriteProducts: [
    {
      type: Schema.ObjectId,
      ref: "Productos",
    }

  ],
}, {
  versionKey: false

});

export default model("Favorite", favoriteSchema);
