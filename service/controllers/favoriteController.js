import { FavoriteRepo, ProductRepo, UserRepo } from "../repositories/Repository";
const favoriteRepo = new FavoriteRepo()
const productRepo = new ProductRepo()
export const postFavoriteProduct = async (req, res) => {
    const { id } = req.body.product
    try {
        const userId = req.userId
        // //devuelve el carrito si es que existe si no existe crea uno
        let favorite = await favoriteRepo.get({ user: userId })

        let product = await productRepo.get({ _id: id })

        if (!product[0]) return res.status(404).json({ msg: "el producto no existe" });

        if (favorite[0]) {

            favorite[0].favoriteProducts.push(id);
            await favorite[0].save();
            return res.json({ msg: "el producto a sido agregado correctamente a la lista de favoritos" });
        }
        else {
            //     //no cart for user, create new cart
            const newFavorite = await favoriteRepo.create({
                user: userId,
                favoriteProducts: [id],
            })

            if (!newFavorite) return res.json({ msg: "no se a podido agregar a la lista de favoritos" });

            return res.json({ msg: "el producto a sido agregado correctamente" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
}


export const getFavoriteProduct = async (req, res) => {
    try {
        const userId = req.userId
        const favorite = await favoriteRepo.get({ user: userId })
        console.log(favorite)
        if (favorite.length == 0) return res.status(404).json({ msg: "no hay favoritos agregados" })
        //mostrar el carrito
        res.json(favorite);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'hubo un error' })
    }
}