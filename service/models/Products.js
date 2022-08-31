const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true,
      },
    images: Array,
}, {
    timestamps: true
})

module.exports = mongoose.model('Productos', userSchema)