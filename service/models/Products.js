const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    photoURL: {
        type: String,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    price:{
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Productos',userSchema )