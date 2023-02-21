import { CategoryRepo } from "../repositories/Repository"
const categoryRepo = new CategoryRepo()

//crea una categoria
export const createCategory = async (req, res) => {
    try {

        const newCategory = await categoryRepo.create(req.body)

        if (!newCategory) return res.status(404).send("the category cannot be created!");

        const categories = await categoryRepo.get({})

        res.json({ categories, msg: "la categoria se a creado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
}


//devuelve todas las categorias o filtra una categoria
export const getCategories = async (req, res) => {
    try {

        let categories = await categoryRepo.get({})
        categories.forEach(category => {
            category.path = "lista-Productos/" +category._id
        });
        // si no mandamos id devuelve todas las categorias
        if (!req.query.id) return res.status(200).json(categories);

        const search = await categoryRepo.get({ _id: req.query.id })

        res.status(200).json(search);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
};

//actualiza una categoria
export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await categoryRepo.update(req.params.categoryId, req.body)

        if (!updatedCategory) return res.status(400).send("the category cannot be updated");

        res.send(updatedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
};

//elimina una categoria
export const deleteCategory = async (req, res) => {
    const { categoryId } = req.params

    try {
        const category = await categoryRepo.get({ categoryId })

        if (!category) {
            return res.status(404).json({ msg: "no existe esa categoria" });
        }
        const deletedCategory = await categoryRepo.delete(categoryId)

        if (!deletedCategory) {
            return res.status(404).json({ msg: "no se a podido eliminar la categoria" });
        }

        res.json({ msg: "se a eliminado el producto correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
};

