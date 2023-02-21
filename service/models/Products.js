import {Schema, model} from 'mongoose'

const productSchema = Schema({
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
    checkedOffer: {
        type: Boolean,
        required: true,
    },
    originalPrice: {
        type: Number,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        require: true,
      },
    images: Array,
}, {
    timestamps: true,
    versionKey: false
})

export default model('Productos', productSchema)