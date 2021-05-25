import React, { useContext, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Style from "./Style";
import PriceProduct from "../priceProduct/PriceProduct";
import Button from "@material-ui/core/Button";
import ProductContext from "../../context/productsContext/ProductContext";
import './Style.css';
import SnackbarOpen from "../snackbar/SnackBar";
import CartContext from "../../context/cartContext/CartContext";
import UserContext from '../../context/productsContext/userContext/UserContext'
import {withRouter} from 'react-router-dom'
const ProductDescription = ({ match, history }) => {
  const classes = Style();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // context products
  const productsContext = useContext(ProductContext)
  const { selectedProduct, getProduct } = productsContext

  //cartContext
  const cartContext = useContext(CartContext);
  const { generateOrder, msg, error, severity, closeError } = cartContext

  //userContext
  const userContext = useContext(UserContext);
  const { user } = userContext;


  const addCartClick = () => {
    const order = {
      "user": user.user._id,
      "id": _id,
      "quantity": 2,
      "total": 133,
    }
    generateOrder(order)

    history.push("/")
  }

  useEffect(() => {
    closeError()
    const product = () => {
      const id = match.params.id
      getProduct(id)
    }

    product()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!selectedProduct) return null

  const { descripcion, price, _id, name } = selectedProduct;


  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <img
                  src="https://www.bbva.com/wp-content/uploads/2017/11/iceberg-recurso-fondo-de-comercio-bbva-1024x416.jpg"
                  alt="imagen"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <PriceProduct price={price} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {descripcion}
                <div className="buttonCenter">
                  <Button variant="contained" color="primary" onClick={addCartClick}>
                    Agregar al carrito
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
      {error ? <SnackbarOpen msg={msg} severity={severity} /> : null}
    </div>
  );
};

export default withRouter(ProductDescription);
