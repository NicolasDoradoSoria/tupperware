import { useEffect, useContext, useState } from 'react';
import Style from "./Style";
import SnackbarOpen from "../snackbar/SnackBar";
import SnackBarContext from '../../context/snackbarContext/SnackbarContext';
import UserContext from "../../context/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import MaterialTableCart from './MaterialTableCart';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import MercadoPagoIntegration from '../mercadoPagoIntegration/MercadoPagoIntegration';

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
  const { getOrder, productsInCart, msg } = cartContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { openSnackbar } = snackbarContext

  //hook  
  const [total, setTotal] = useState(0)
  const [isBuy, setIsBoy] = useState(false)


  const updateTotalToPay = () => {
    if (productsInCart.length === 0) {
      setTotal(0)
      return
    }

    let newTotal = 0
    productsInCart.map(product => newTotal += (product.quantity * product.id.price))
    setTotal(newTotal)
  }

  const checkout = () => setIsBoy(true)

  useEffect(() => {

    if (user) {
      getOrder(user.user._id)
      updateTotalToPay()
    }
    if (msg) {
      openSnackbar(msg.msg, msg.category)
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg])

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
        <Paper className={classes.paper}>
          {isBuy ? <MercadoPagoIntegration /> : <div>

            <Button onClick={checkout} color="primary" variant="contained">
              Finalizar Compra
            </Button>
          </div>}
        </Paper>

      </div>

    </Box>
  );
}

export default ShoppingCart