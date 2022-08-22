const mongoose = require("mongoose");

const carruselImageSchema = mongoose.Schema({
    files: [Object]
}, {timestamps: true});

module.exports = mongoose.model("ProductImages", carruselImageSchema);