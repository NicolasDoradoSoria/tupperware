import { useEffect, useContext} from 'react';
import Style from "./Style";
import SnackbarOpen from "../snackbar/SnackBar";
import SnackBarContext from '../../context/snackbarContext/SnackbarContext';
import UserContext from "../../context/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import ProductCart from './ProductCart';
import { Box, Grid } from '@material-ui/core';
import PaymentSummary from './PaymentSummary';

//en esta funcion se calcula el total del carrito y se llama a MaterialTableCart
const Cart = () => {
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext);
  const { user } = userContext;

  //cartContext
  const cartContext = useContext(CartContext);
  const { getOrder, productsInCart, msg, orders } = cartContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { openSnackbar } = snackbarContext

  useEffect(() => {

    if (user) getOrder(user.user._id)
    if (msg) openSnackbar(msg.msg, msg.category)

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg])

  return (
    <Box className={classes.root}>
      <div className={classes.shoppingCartContainer}>
        <Grid container spacing={4}>
          <Grid container item xs={10} md={9}>
            <Grid container spacing={3} className={classes.containerGrid}>
              {productsInCart.map((product, index) =>
                <ProductCart key={index} product={product} />
              )}
            </Grid>
          </Grid>
          <Grid item xs={9} md={2} className={classes.abstract}>
            <PaymentSummary productsInCart={productsInCart} orders={orders} />
          </Grid>
        </Grid>
      </div>
      {msg ? <SnackbarOpen /> : null}
    </Box>
  );
}

export default Cart