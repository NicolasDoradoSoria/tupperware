import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import Style from "./Style";
import PriceProduct from "../priceProduct/PriceProduct";
import ProductContext from "../../context/productsContext/ProductContext";
import SnackbarOpen from "../snackbar/SnackBar";
import CartContext from "../../context/cartContext/CartContext";
import UserContext from '../../context/productsContext/userContext/UserContext'
import { withRouter } from 'react-router-dom'
import SnackBarContext from "../../context/snackbarContext/SnackbarContext";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel"
import { Container, Grid, Paper, Button, TextField } from "@material-ui/core";

const Publication = ({ match, history }) => {
  const classes = Style();

  const fixedHeightPaper = clsx(classes.paper);

  // context products
  const productsContext = useContext(ProductContext)
  const {product, getProduct } = productsContext

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

  const changeQuantity = (e) => {
    setQuantity(e.target.value);
  }

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


  
  if (!product) return null

  const { descripcion, price, _id, name, stock, imageId } = product;

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container} >
          <Grid container spacing={3} >
            <Grid item xs={6} md={8} lg={9} >
              <Paper className={fixedHeightPaper} >
                {/* CAROUSEL */}
                <Carousel autoPlay={true}
                  animation="fade"
                  indicators={true}
                  timeout={500}
                  cycleNavigation={true}
                  navButtonsAlwaysVisible={true}
                  navButtonsAlwaysInvisible={false}>
                  {
                    imageId.files.map(image => {
                      return (
                        <div key={image._id}>
                          <img src={`http://localhost:4000/${image.fileName}`} className={classes.image} alt="imagen"></img>
                        </div>
                      )
                    })
                  }
                </Carousel>
              </Paper>
            </Grid>

            <Grid item xs={12} sm container>
              {/* NOMBRE */}
              <Grid item xs>
                <Paper className={fixedHeightPaper}>
                  <h2 className={classes.name}>{name}</h2>
                </Paper>
              </Grid>

              {/* PRECIO */}
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                  <PriceProduct price={price} />
                </Paper>
              </Grid>

              {/* CANTIDAD */}
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

              {/* AGREGAR AL CARRITO */}
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

            {/* DESCRIPCION */}
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
