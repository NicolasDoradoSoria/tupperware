import React, { useContext } from 'react';

import UserContext from "../../context/productsContext/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";

import MaterialTable from "material-table"

import Style from "./Style";

// columnas de Material Table
// con field le digo donde tiene que ir a buscar
const columns = () => [
    {

        title: "Nombre", field: "id.name"
    },
    {
        title: "Precio", field: "id.price"
    },
    {
        title: "Cantidad", field: "quantity"
    },
    // { title: '', field: 'id.photoURL', render: item => <img src={`http://localhost:4000/${item.id.photoURL}`} alt="" border="3" height="100" width="100" /> },
]

//opciones de Material table
//desabilita la paginacion y la busqueda y a la columna accion la manda al final
const options = {
    paging: false,
    search: false,
    actionsColumnIndex: -1,
}

// en esta funcion genero MaterialTable 
const MaterialTableCart = () => {
    const classes = Style();
    //userContext
    const userContext = useContext(UserContext);
    const { user } = userContext;

    //cartContext
    const cartContext = useContext(CartContext);
    const { removeOrderProduct, productsInCart, cleanCart } = cartContext

    //eliminar un producto de la lista
    const deleteProduct = (e, produtSelect) => {
        removeOrderProduct(user.user._id, produtSelect._id)
    }

    // elimina todos los productos
    const deleteAllProduct = () => {
        cleanCart(user.user._id)
    }
    return (
        <div className={classes.materialTable}>
            {/* material table necesita el titulo, datos y los nombre de la columnas y las acciones son Opcionales*/}
            {/* ACCIONES */}
            {/* tengo la pocion de eliminar todo el carrito o si no un producto del carrito */}
            <MaterialTable title="Carrito de compras" data={productsInCart} columns={columns()} actions={[
                {
                    icon: "delete",
                    tooltip: 'Eliminar producto',
                    onClick: deleteProduct
                },
                {
                    icon: "delete",
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
        </div>
    );
}

export default MaterialTableCart;