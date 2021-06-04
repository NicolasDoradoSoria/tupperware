import React, { useEffect, useContext, useState } from 'react';
import MainFeaturedPost from '../mainFeaturedPost/MainFeaturedPost'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UserContext from "../../context/productsContext/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import SnackBarContext from '../../context/snackbarContext/SnackbarContext';
import SnackbarOpen from "../snackbar/SnackBar";
import Style from "./Style";

const ShoppingCart = () => {
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext);
  const { user } = userContext;

  //cartContext
  const cartContext = useContext(CartContext);
  const { getOrder, orders, removeOrderProduct, products, cleanCart } = cartContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { error } = snackbarContext

  //hook  
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getOrder(user.user._id)
    updateTotalToPay()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  const updateTotalToPay = () => {

    if (products.length === 0) {
      setTotal(0)
      return
    }

    let newTotal = 0
    products.map(product => newTotal += (product.quantity * product.id.price))

    setTotal(newTotal)
  }


  return (
    <div className={classes.body}>
      <form>

        <MainFeaturedPost />
        <TableContainer component={Paper} className={classes.TableContainer} >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Producto</TableCell >
                <TableCell align="right">Descripcion</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell align="right">{product.id.name}</TableCell>
                  <TableCell align="right">{product.id.descripcion}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">{product.id.price}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeOrderProduct(user.user._id, product._id)}
                    >
                      <Delete />
                    </Button></TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
          {(products.length === 0) ? <p className={classes.orderListNull}>No hay productos en el carrito de compras</p> : null}

        </TableContainer>
        <div className={classes.paperContainer}>
          {(products.length !== 0) ?
            <div className={classes.paperClean}>
              <Paper className={classes.paper}>
                <Typography component="p" variant="h5">
                  vaciar carrito
            </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.cleanButton}
                  onClick={() => cleanCart(user.user._id)}
                >
                  <Delete />
                </Button>
              </Paper>
            </div> : null
          }
          <div className={classes.paperTotal}>
            <Paper className={classes.paper}>
              <Typography component="p" variant="h5">
                Total a Pagar: <span>${total}</span>
              </Typography>
            </Paper>
          </div>
        </div>
        {error ? <SnackbarOpen /> : null}
      </form>
    </div>
  );
}

export default ShoppingCart;