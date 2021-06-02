import React, { useEffect, useContext, useState } from 'react';
import MainFeaturedPost from '../mainFeaturedPost/MainFeaturedPost'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from "../../context/productsContext/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import SnackBarContext from '../../context/snackbarContext/SnackbarContext';
import SnackbarOpen from "../snackbar/SnackBar";
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    justifyContent: "center"
  },
  orderListNull: {
    marginTop: "1rem",
    textAlign: "center"
  },
  TableContainer: {
    width: '90%',
    margin: "auto",
  },
  body: {
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(1),
    margin: "1rem",
    width: "25%",
    display: "flex",
    justifyContent: "center",
  },
  divPaper: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "1rem"
  }
}));

const ShoppingCart = () => {
  const classes = useStyles();

  //userContext
  const userContext = useContext(UserContext);
  const { user } = userContext;

  //cartContext
  const cartContext = useContext(CartContext);
  const { getOrder, orders, removeOrderProduct, products } = cartContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { error, closeSnackbar } = snackbarContext

  //hook  
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getOrder(user.user._id)
    if (!orders) return null
    updateTotalToPay()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders])

  const updateTotalToPay = () => {
    if (orders.length === 0) {
      setTotal(0)
      return
    }

    let newTotal = 0
    products.map(product => newTotal += (product.quantity * product.id.price))

    setTotal(newTotal)
  }
  return (
    <div className={classes.body}>

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
        {(products.length === 0) ? <p className={classes.orderListNull}>NO hay productos en el carrito de compras</p> : null}

      </TableContainer>
      <div className={classes.divPaper}>
        <Paper className={classes.paper}>
          <Typography component="p" variant="h5">
            Total a Pagar: <span>${total}</span>
          </Typography>
        </Paper>
      </div>
      {error ? <SnackbarOpen /> : null}
    </div>
  );
}

export default ShoppingCart;