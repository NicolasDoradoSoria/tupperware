import React, { useContext } from 'react';
import UserContext from "../../context/productsContext/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import SnackBarContext from '../../context/snackbarContext/SnackbarContext';
import SnackbarOpen from "../snackbar/SnackBar";
import Style from "./Style";
import MaterialTable from "material-table"


const CartTable = () => {
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext);
  const { user } = userContext;

  //cartContext
  const cartContext = useContext(CartContext);
  const { removeOrderProduct, productsInCart, cleanCart } = cartContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { error } = snackbarContext

  const deleteProduct = (e, produtSelect) => {
    removeOrderProduct(user.user._id, produtSelect._id)
  }

  const deleteAllProduct = () =>{
    cleanCart(user.user._id)
  }
  return (
    <>
        <MaterialTable title="Material table" data={productsInCart} columns={[
          {
            title: "Name", field: "id.name"
          },
          {
           title: "Name", field: "id.descripcion"
         },
         {
           title: "Stock", field: "id.stock"
         },
         {
           title: "Precio", field: "id.price"
         },
          {
           title: "Cantidad", field: "quantity"
         },
         
         ]} actions={[
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
        }/> 
      {error ? <SnackbarOpen /> : null}
      
      

    </>
  );
}

export default CartTable;
