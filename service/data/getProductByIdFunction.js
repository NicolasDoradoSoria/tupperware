const Products = require("../models/Products");

module.exports = async function getProductByIdFunction(id){
    return await Products.findById(id)
} 