import React, { Fragment, useEffect, useContext } from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ShoppingCart = () => {
  const classes = useStyles();

  //userContext
  const userContext = useContext(UserContext);
  const { user } = userContext;

  //cartContext
  const cartContext = useContext(CartContext);
  const { getOrder, orders } = cartContext

  useEffect(() => {
    getOrder(user.user._id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (orders.length === 0) return null;
  console.log(orders.length === 0)
  return (
    <Fragment>

      <MainFeaturedPost />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Producto</TableCell>
              <TableCell align="right">Descripcion</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                {console.log(order)}
                <TableCell align="right">{order.id.name}</TableCell>
                <TableCell align="right">{order.id.descripcion}</TableCell>
                <TableCell align="right">{order.quantity}</TableCell>
                <TableCell align="right">{order.id.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

export default ShoppingCart;