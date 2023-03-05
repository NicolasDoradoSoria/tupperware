import { useEffect, useContext, useState, useRef } from 'react';
import Style from "./Style";
import SnackbarOpen from "../snackbar/SnackBar";
import SnackBarContext from '../../context/snackbarContext/SnackbarContext';
import UserContext from "../../context/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import ProductCart from './ProductCart';
import PaymentSummary from './PaymentSummary';
import { Box, Grid, CircularProgress, Backdrop } from '@material-ui/core';

//en esta funcion se calcula el total del carrito y se llama a MaterialTableCart
const Cart = () => {
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext);
  const { user } = userContext;

  //cartContext
  const cartContext = useContext(CartContext);
  const { getOrder, msg, orders} = cartContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { openSnackbar } = snackbarContext

  // progres material ui
  const [loading, setLoading] = useState(false);

  // progress
  const [open, setOpen] = useState(false);

  const timer = useRef();

  const handleProgress = () => {
    setOpen(true)
    if (!loading) {
      setLoading(true);
        timer.current = window.setTimeout(() => {
            setOpen(false)
            setLoading(false);
        }, 2000);
    }
}

  useEffect(() => {

    if (user) getOrder(user.user._id)
    if (msg) openSnackbar(msg.msg, msg.category)

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg])

  if (!orders) return null
  return (
    <Box className={classes.root}>
      <div className={classes.shoppingCartContainer}>
        <Grid container spacing={4}>
          <Grid container item xs={10} md={9}>
            <Grid container spacing={3} className={classes.containerGrid}>
              {orders.products.map((product, index) =>
                <ProductCart key={index} product={product} handleProgress={handleProgress} />
              )}
            </Grid>
          </Grid>
          <Grid item xs={9} md={2} className={classes.abstract}>
            <PaymentSummary />
          </Grid>
        </Grid>
      </div>
      {/* progress */}
      {loading && ( <Backdrop className={classes.backdrop} open={open} size={50}>
        <CircularProgress color="inherit" />
      </Backdrop>)}
      {msg ? <SnackbarOpen /> : null}
    </Box>
  );
}

export default Cart