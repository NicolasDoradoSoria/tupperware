const { productsModel } = require("../models");
module.exports = getOrderAmaount = async products =>{
    let amaount = 1

    for(let index = 0; index < products.length; index++){
        const product = products[index]
        const productsDB = await productsModel.findById(product.id)
        amaount += productsDB.price
    }
    const onlyTwoDecimals= amaount.toFixed(2)
    const parseamaount = parseInt(onlyTwoDecimals.replace('.', ""), 10)
    return parseamaount
}