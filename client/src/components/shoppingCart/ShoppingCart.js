import React, { useEffect, useContext, useState } from 'react';

import Style from "./Style";
import { withRouter } from 'react-router-dom'

import SnackbarOpen from "../snackbar/SnackBar";
import SnackBarContext from '../../context/snackbarContext/SnackbarContext';
import UserContext from "../../context/productsContext/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import MaterialTableCart from './MaterialTableCart';
import { Box, Paper, Typography } from '@material-ui/core';

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
  const { getOrder, productsInCart } = cartContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { error } = snackbarContext

  //hook  
  const [total, setTotal] = useState(0)

  useEffect(() => {

    const consultarAPI = async () => {
      getOrder(user.user._id)
      updateTotalToPay()
      
      try {
      } catch (error) {
        console.log(error)
      }
    }

    consultarAPI()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsInCart])


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
    <Box className={classes.body} >

      <MaterialTableCart columns={columns()} options={options} />
      {error ? <SnackbarOpen /> : null}
      <div className={classes.paperContainer}>

        <div className={classes.paperTotal}>
          <Paper className={classes.paper}>
            <Typography component="p" variant="h5">
              Total a Pagar: <span>${total}</span>
            </Typography>
          </Paper>
        </div>
      </div>
    </Box>
  );
}

export default withRouter(ShoppingCart);