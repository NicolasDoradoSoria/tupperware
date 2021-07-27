import React, { useContext } from 'react';

import UserContext from "../../context/productsContext/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";

import MaterialTable from "material-table"


const MaterialTableCart = ({columns, options}) => {

    //userContext
    const userContext = useContext(UserContext);
    const { user } = userContext;

    //cartContext
    const cartContext = useContext(CartContext);
    const { removeOrderProduct, productsInCart, cleanCart } = cartContext

    const deleteProduct = (e, produtSelect) => {
        removeOrderProduct(user.user._id, produtSelect._id)
    }

    const deleteAllProduct = () => {
        cleanCart(user.user._id)
    }
    return (
        <>
            <MaterialTable title="Carrito de compras" data={productsInCart} columns={columns} actions={[
                {
                    icon: "delete",
                    tooltip: 'Eliminar producto',
                    onClick: deleteProduct
                },
                {
                    icon: "remove_shopping_cart",
                    tooltip: 'Eliminar Carrito',
                    isFreeAction: true,
                    onClick: deleteAllProduct,
                    hidden: productsInCart.length === 0
                }
            ]}
                localization={
                    {
                        body: { emptyDataSourceMessage: "No hay items en el carrito" },
                        header: { actions: "Acciones" }
                    }
                }
                
                options={
                    options
                  }
                  />
        </>
    );
}

export default MaterialTableCart;