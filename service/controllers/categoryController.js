import Category from "../models/Category"

//crea una categoria
export const createCategory = async (req, res) => {
    try {

        const { name } = req.body
        let category = new Category({ name });
        category = await category.save();
        if (!category) return res.status(404).send("the category cannot be created!");

        const categoryList = await Category.find()

        res.json({ categoryList, msg: "la categoria se a creado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
}


//devuelve todas las categorias o filtra una categoria
export const getCategories = async (req, res) => {
    try {
        const categoryList = await Category.find();

        // si no mandamos id devuelve todas las categorias
        if (!req.query.id) return res.status(200).json(categoryList);

        const search = await Category.find({ _id: req.query.id })

        res.status(200).json(search);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
};

//actualiza una categoria
export const updateCategory = async (req, res) => {
    const { name } = req.body

    const { categoryId } = req.params
    try {
        const category = await Category.findByIdAndUpdate(
            categoryId, { name }, { new: true });

        if (!category) return res.status(400).send("the category cannot be created");

        res.send(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
};

//elimina una categoria
export const deleteCategory = async (req, res) => {
    const { categoryId } = req.params

    try {
        const categories = await Category.find();
        //si el producto existe o no
        let category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ msg: "no existe esa categoria" });
        }
        await Category.findByIdAndDelete(categoryId)
        console.log(categories)
        res.json({categories, msg: "se a eliminado el producto correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
};

