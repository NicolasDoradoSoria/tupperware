import Products from "../models/Products"

export const getProductsfunction = async (req, res) => {
    let filter = {};
    if (req.query.id) {

        filter = { category: req.query.id.split(",") };
    }
    return await Products.find(filter).populate({ path: "imageId", model: "ProductImages" }).populate("category");
    // res.json({ products });

}



