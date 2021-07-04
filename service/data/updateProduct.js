const Products = require("../models/Products");

module.exports = updateProduct = async (product, id) =>{
    try {
       
        await Products.findByIdAndUpdate(
            { _id: id },
            product,
            {
              new: true,
            }
          ) 
    } catch (error) {
        console.log(error)
    }
    
}