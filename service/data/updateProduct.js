import Products from "../models/Products"

const updateProduct = async (product, id) =>{
  try {
      console.log("holaaaaaaaaaaaaaaa")
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

module.exports = { updateProduct }