import React, { useContext, useEffect, useState } from "react";
import { useTheme } from '@material-ui/core/styles';
import clsx from "clsx";
import Style from "./Style";
import ProductContext from "../../context/productsContext/ProductContext";
import SnackbarOpen from "../snackbar/SnackBar";
import CartContext from "../../context/cartContext/CartContext";
import UserContext from '../../context/userContext/UserContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SnackBarContext from "../../context/snackbarContext/SnackbarContext";
import { Grow, Grid, Paper, Button, TextField, Typography, withStyles, InputAdornment } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const Publication = ({ idProduct }) => {
  const navigate = useNavigate()
  const { id } = useParams();
  const classes = Style();
  const theme = useTheme();
  const fixedHeightPaper = clsx(classes.paper);

  // context products
  const productsContext = useContext(ProductContext)
  const { product, getProduct } = productsContext

  //cartContext
  const cartContext = useContext(CartContext);
  const { generateOrder, msg } = cartContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { openSnackbar } = snackbarContext

  //userContext
  const userContext = useContext(UserContext);
  const { user, authenticated } = userContext;

  //hooks 
  const [quantity, setQuantity] = useState(1)

  // contador de imagen
  const [activeStep, setActiveStep] = useState(0);

  // trancicion de botono vista previa
  const [checked, setChecked] = useState(false);

  // agrega opacidad pasando el mouse por la imagen
  const [cardMediaStyle, setCardMediaStyle] = useState({ opacity: 1 })

  // cambiar cantidad 
  const changeQuantity = (e) => {
    const input = e.target.value
    if (input > 0 && stock <= input) setQuantity(input);

  }

  // cambiar cantidad a traves de los iconos + u - 
  const changeQuantityIcon = (quantityNew) => {
    if (quantityNew > 0) setQuantity(quantityNew)
  }

  // agrega al carrito de compras el producto
  const addCartClick = () => {
    const order = {
      "user": user.user._id,
      "products": [
        { "id": _id, "quantity": quantity },
      ],
      "total": 133,
    }
    generateOrder(order)
  }

  const navigateToLogin = () => navigate(`/login`)
  

  const handleNext = () => {
    setChecked(false);
    setTimeout(() => {
      setChecked(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, "1000")
  };

  const handleBack = () => {
    setChecked(false);
    setTimeout(() => {
      setChecked(true);
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }, "1000")
  };

  const smallImage = (count) => {
    setChecked(false);
    setTimeout(() => {
      setChecked(true);
      setActiveStep(count)
      setCardMediaStyle({ opacity: 0.5, transition: `opacity 1000ms ease-in-out` })
    }, "1000")
  }


  useEffect(() => {
    smallImage(0)
    !idProduct ? getProduct(id) : getProduct(idProduct)

    if (msg) openSnackbar(msg.msg, msg.category)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg])

  if (!product) return null
  const { descripcion, price, _id, name, stock, images, category, checkedOffer, originalPrice } = product;

  return (
    <>
      <Grid container spacing={4} justifyContent="center" className={!idProduct ? classes.root : classes.rootDialog} >
        {/* route */}
        {!idProduct ?
          <Grid item xs={10}  >
            <Paper className={fixedHeightPaper}>

              <div className={classes.linksConteiner}>
                <p> <Link to={"/"} className={classes.link}>Inicio</Link> / <Link to={"/"} className={classes.link}>{category.name}</Link> / {name}</p>
              </div>
            </Paper>
          </Grid> : null
        }
        {/* Grid Izquierdo */}
        <Grid container item xs={11} sm={5} className={classes.leftMainGrid}>

          {/* VISTA PREVIA */}
          <Grid item className={classes.left_1} xs={12} md={9}>
            {images.map((img, i) => (
              <img
                key={i}
                onClick={() => smallImage(i)}
                className={classes.left_img}
                src={`http://localhost:4000/${img.fileName}`}
                alt={images[activeStep].fileName}
                style={activeStep === i ? cardMediaStyle : null}
              />
            ))}
          </Grid>

          {/* CAROUSEL */}
          <Grid item container className={classes.right_1} xs={12} md={9}>
            <Grid item xs={8} md={12}>

              <Grow in={checked} timeout={1000}>
                <div className={classes.right_img_container}>

                  <img
                    className={classes.right_img}
                    src={`http://localhost:4000/${images[activeStep].fileName}`}
                    alt="funcionaaa"
                  />
                </div>
              </Grow>
            </Grid>
            <Grid item xs={8} md={12}>
              <MobileStepper
                steps={images.length}
                position="static"
                variant="text"
                activeStep={activeStep}
                className={classes.MobileStepper}
                nextButton={
                  <Button size="small" onClick={handleNext} disabled={activeStep === images.length - 1}>
                    Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                  </Button>
                }
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Grid Derecho */}
        <Grid item container xs={12} sm={!idProduct ? 4 : 5} spacing={4} className={classes.rightMainGrid}>
          {/* NOMBRE */}
          <Grid item xs={11} md={12} >
            <Typography variant="h3">{name}</Typography>
          </Grid>

          {/* PRECIO */}
          <Grid item xs={5} md={12}>
            {checkedOffer ?
              <Typography component="p" variant="h5" gutterBottom className={classes.offer}>
                {`$${originalPrice}`}
              </Typography>
              : null}
          <Typography component="p" variant="h5">
              {`$${price}`}
            </Typography>
          </Grid>

          {/* DESCRIPCION */}
          <Grid item xs={11} md={12} >
            {descripcion}
          </Grid>

          <Grid item md={12} container justifyContent="center">
            {/* STOCK */}
            <Grid item xs={11} md={6} >
              <CssTextField
                label="cantidad"
                id="outlined-basic"
                variant="outlined"
                type="tel"
                name="quantity"
                value={quantity}
                className={`${classes.loginButtonAndCount}`}
                onChange={changeQuantity}
                inputProps={{
                  style: { textAlign: 'center' },
                }}
                InputProps={{
                  endAdornment: (
                    <AddIcon onClick={() => { changeQuantityIcon(quantity + 1) }} />
                  ), startAdornment: (
                    <InputAdornment position="start">
                      <RemoveIcon onClick={() => { changeQuantityIcon(quantity - 1) }} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {/* AGREGAR AL CARRITO */}
            <Grid item xs={11} md={6}>
              {authenticated ?
                stock <= 0 ? <Button variant="contained" disabled className={classes.loginButtonAndCount}>No disponible</Button> :
                  <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={addCartClick}
                    className={classes.loginButtonAndCount}>
                    Agregar al carrito
                  </Button> :
                <Button
                  className={classes.loginButtonAndCount}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={navigateToLogin}
                >
                  Iniciar Secion
                </Button>
              }
            </Grid>
          </Grid>

          {/* CATEGORIA */}
          <Grid item xs={11} md={12} >
            <Typography variant="h5">
              Categoria: {category.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {msg ? <SnackbarOpen /> : null}
    </>
  );
};

export default Publication
const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
        borderWidth: '3px',
      },
    },
  },
})(TextField);