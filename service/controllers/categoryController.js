import Category from "../models/Category"

//crea una categoria
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        let category = new Category({
            name,
        });
        category = await category.save();
        if (!category) return res.status(404).send("the category cannot be created!");


        res.status(200).send("la categoria se a creado correctamente");
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}


//devuelve todas las categorias o filtra una categoria
export const getCategories = async (req, res) => {
    try {
        const categoryList = await Category.find();
        
        // si no mandamos id devuelve todas las categorias
        if (!req.query.id) {
            return res.status(200).json(categoryList);
        }

        
        const search = await Category.find({ _id: req.query.id })


        res.status(200).json(search);

    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
};

//actualiza una categoria
export const updateCategory = async (req, res) => {
    const { name } = req.body

    const { categoryId } = req.params
    try {
        const category = await Category.findByIdAndUpdate(
            categoryId,
            { name },
            { new: true }
        );

        if (!category) return res.status(400).send("the category cannot be created");

        res.send(category);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
};

//elimina una categoria
export const deleteCategory = async (req, res) => {
    const { categoryId } = req.params

    try {
        let deleteCategory = await Category.findByIdAndRemove(categoryId)
        if (deleteCategory) {
            return res
                .status(200)
                .json({ success: true, message: "the category deleted" });
        }

        else {
            return res
                .status(404)
                .json({ success: false, message: "categry not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
};

