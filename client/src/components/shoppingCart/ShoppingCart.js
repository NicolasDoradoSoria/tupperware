import React, { useEffect, useContext, useState } from 'react';
import MainFeaturedPost from '../mainFeaturedPost/MainFeaturedPost'

import Style from "./Style";
import { withRouter } from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import SnackbarOpen from "../snackbar/SnackBar";
import SnackBarContext from '../../context/snackbarContext/SnackbarContext';
import UserContext from "../../context/productsContext/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import MaterialTableCart from './MaterialTableCart';
import { Box } from '@material-ui/core';

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
  // { title: 'Imagen', field: 'id.photoURL', render: item => <img src={`http://localhost:4000/${item.id.photoURL}`} alt="" border="3" height="100" width="100" /> },
]

const options = {
  paging: false,
  actionsColumnIndex: -1,
}

const ShoppingCart = ({ history }) => {
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
        // history.push("/login")
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
    // productsInCart.map(product => newTotal += (product.quantity * product.id.price))

    setTotal(newTotal)
  }
  return (
    <Box className={classes.body} >

      {/* <MainFeaturedPost /> */}
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