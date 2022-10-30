import { useEffect, useContext, useState } from 'react';
import Style from "./Style";
import SnackbarOpen from "../snackbar/SnackBar";
import SnackBarContext from '../../context/snackbarContext/SnackbarContext';
import UserContext from "../../context/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import MaterialTableCart from './MaterialTableCart';
import { Box, Paper, Typography } from '@material-ui/core';

// nombre de las columnas 
// fild --> busca el nombre campo en el registro
const columns = () => [
  {

    title: "Nombre", field: "id.name"
  },
  {
    title: "Descripcion", field: "id.descripcion"
  },
  {
    title: "Stock Disponible", field: "id.stock"
  },
  {
    title: "Precio", field: "id.price"
  },
  {
    title: "Cantidad", field: "quantity"
  },
]
// configuracion de material Table
const options = {
  paging: false,
  actionsColumnIndex: -1,
}

//en esta funcion se calcula el total del carrito y se llama a MaterialTableCart
const ShoppingCart = () => {
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext);
  const { user } = userContext;

  //cartContext
  const cartContext = useContext(CartContext);
  const { getOrder, productsInCart, msg} = cartContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { openSnackbar } = snackbarContext

  //hook  
  const [total, setTotal] = useState(0)

  useEffect(() => {

    if (user) {
      getOrder(user.user._id)
      updateTotalToPay()
    }
    if(msg) {
      openSnackbar(msg.msg, msg.category)
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg])


  const updateTotalToPay = () => {

    if (productsInCart.length === 0) {
      setTotal(0)
      return
    }

    let newTotal = 0
    productsInCart.map(product => newTotal += (product.quantity * product.id.price))

    setTotal(newTotal)
  }
  
  return (
    <Box className={classes.root}>
      <MaterialTableCart columns={columns()} options={options} />
      {msg ? <SnackbarOpen /> : null}

      <div className={classes.paperContainer}>
        <Paper className={classes.paper}>
          <Typography component="p" variant="h5">
            Total a Pagar: <span>${total}</span>
          </Typography>
        </Paper>
      </div>
    </Box>
  );
}

export default ShoppingCart