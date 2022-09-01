import Products from "../models/Products"

const  updateProduct = async (product, id) =>{
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

export default { updateProduct }