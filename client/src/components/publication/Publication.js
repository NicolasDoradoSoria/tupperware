import React, { useContext, useEffect, useState } from "react";
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
import { withRouter } from 'react-router-dom'
import SnackBarContext from "../../context/snackbarContext/SnackbarContext";
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
const Publication = ({ match, history }) => {
  const classes = Style();

  const fixedHeightPaper = clsx(classes.paper);
  // context products
  const productsContext = useContext(ProductContext)
  const { selectedProduct, getProduct } = productsContext

  //cartContext
  const cartContext = useContext(CartContext);
  const { generateOrder } = cartContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { error, closeSnackbar } = snackbarContext

  //userContext
  const userContext = useContext(UserContext);
  const { user, authenticated } = userContext;

  //hooks 
  const [quantity, setQuantity] = useState(1)

  const addCartClick = () => {
    const order = {
      "user": user.user._id,
      "id": _id,
      "quantity": quantity,
      "total": 133,
    }
    generateOrder(order)

    history.push("/")
  }

  useEffect(() => {
    closeSnackbar()
    const product = () => {
      const id = match.params.id
      getProduct(id)
    }

    product()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const changeQuantity = (e) => {
    setQuantity(e.target.value);
  }
  if (!selectedProduct) return null

  const { descripcion, price, _id, name, photoURL, stock } = selectedProduct;


  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container} >
          <Grid container spacing={3} >
            <Grid item xs={6} md={8} lg={9} >
              <Paper className={fixedHeightPaper} >
                {photoURL ? <img src={`http://localhost:4000/${photoURL}`} alt="imagen" className={classes.image} /> :
                  <img
                    src="https://www.bbva.com/wp-content/uploads/2017/11/iceberg-recurso-fondo-de-comercio-bbva-1024x416.jpg"
                    alt="imagen"
                  />
                }
              </Paper>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs>
                <Paper className={fixedHeightPaper}>
                  <h2 className={classes.name}>{name}</h2>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                  <PriceProduct price={price} />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={fixedHeightPaper}>
                  <TextField
                    label="cantidad"
                    id="standard-number"
                    type="number"
                    name="quantity"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={changeQuantity}
                    defaultValue="1"
                    inputProps={{ min: "1", max: stock }}
                  />
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                  {authenticated ?
                    stock <= 0 ? <Button variant="contained" disabled>No disponible</Button> : <Button variant="contained" color="primary" onClick={addCartClick} >
                    Agregar al carrito
                  </Button> : <Link to={"/login"}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Iniciar Secion
              </Button>
          </Link>
                  }
                </Paper>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h2 className={classes.descripcion}>Descripcion</h2>

                {descripcion}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
      {error ? <SnackbarOpen /> : null}
    </div>
  );
};

export default withRouter(Publication);
