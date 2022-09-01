import {Schema, model} from 'mongoose'

const carruselImageSchema = Schema({
    files: [Object]
}, {timestamps: true});

export default model("ProductImages", carruselImageSchema);