import React, { useContext, useEffect, useState } from "react";
import { useTheme } from '@material-ui/core/styles';
import clsx from "clsx";
import Style from "./Style";
import ProductContext from "../../context/productsContext/ProductContext";
import SnackbarOpen from "../snackbar/SnackBar";
import CartContext from "../../context/cartContext/CartContext";
import UserContext from '../../context/productsContext/userContext/UserContext'
import { Link, useNavigate, useParams} from 'react-router-dom'
import SnackBarContext from "../../context/snackbarContext/SnackbarContext";
import { Grow, Grid, Paper, Button, TextField, Typography, withStyles, InputAdornment } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ReactImageMagnify from 'react-image-magnify';

const Publication = ({idProduct }) => {
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
  const { generateOrder } = cartContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { error, closeSnackbar } = snackbarContext

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
    if (input > 0 && stock <= input) {
      setQuantity(input);
    }
  }

  // cambiar cantidad a traves de los iconos + u - 
  const changeQuantityIcon = (quantityNew) => {
    if (quantityNew > 0) {
      setQuantity(quantityNew)
    }
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

    navigate("/")
  }

  const navigateToLogin = () => {
    navigate(`/login`)
  }

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
    closeSnackbar()
    smallImage(0)
    !idProduct ? getProduct(id) : getProduct(idProduct)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if (!product) return null
  const { descripcion, price, _id, name, stock, images, category } = product;

  return (
    <>
      <Grid container spacing={4} justifyContent="center" className={classes.root} >
        {/* URL */}
        <Grid item xs={6} md={8} >
          <Paper className={fixedHeightPaper}>

            <div className={classes.linksConteiner}>
              <p> <Link to={"/"} className={classes.link}>Inicio</Link> / <Link to={"/"} className={classes.link}>{category.name}</Link> / {name}</p>
            </div>
          </Paper>
        </Grid>
        {/* Grid Izquierdo */}
        <Grid container item xs={11} md={5} className={classes.leftMainGrid}>

          {/* CAROUSEL */}
          {/* <Paper className={fixedHeightPaper} > */}

          <Grid item className={classes.left_1} xs={12} md={2}>
            {images.map((img, i) => (
              <div className={classes.img_wrap} key={i} >
                <img
                  onClick={() => smallImage(i)}
                  className={classes.images}
                  src={`http://localhost:4000/${img.fileName}`}
                  alt={images[activeStep].fileName}
                  style={activeStep === i ? cardMediaStyle : null}
                />
              </div>
            ))}
          </Grid>

          <Grid item xs={12} md={10} className={classes.Right_1}>

            <Grow className={classes.images_2} in={checked} timeout={1000}>
              <ReactImageMagnify {...{
                smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: `http://localhost:4000/${images[activeStep].fileName}`,
                  sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                },
                largeImage: {
                  src: `http://localhost:4000/${images[activeStep].fileName}`,
                  width: 1400,
                  height: 2000
                },
                enlargedImageContainerDimensions: {
                  width: '50%',
                  height: '70%'
                },

              }} />
            </Grow>
            <Paper className={fixedHeightPaper}>

              <MobileStepper
                steps={images.length}
                position="static"
                variant="text"
                activeStep={activeStep}
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
            </Paper>
          </Grid>
        </Grid>

        {/* Grid Derecho */}
        <Grid item container xs={12} md={3} spacing={4} className={classes.rightMainGrid}>
          {/* NOMBRE */}
          <Grid item xs={11} md={12} >
            <Paper className={fixedHeightPaper}>
              <Typography variant="h4">{name}</Typography>
            </Paper>
          </Grid>

          {/* PRECIO */}
          <Grid item xs={5} md={12}>
            <Paper className={fixedHeightPaper}>
              <Typography component="p" variant="h5">
                {`$${price}`}
              </Typography>
            </Paper>
          </Grid>

          {/* DESCRIPCION */}
          <Grid item xs={11} md={12} >
            <Paper className={fixedHeightPaper}>
              {descripcion}
            </Paper>
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
              <Paper>
                {authenticated ?
                  stock <= 0 ? <Button variant="contained" disabled>No disponible</Button> :
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
              </Paper>
            </Grid>
          </Grid>

          {/* CATEGORIA */}
          <Grid item xs={11} md={12} >
            <Paper className={fixedHeightPaper}>
              <Typography variant="h5">
                Categoria: {category.name}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      {error ? <SnackbarOpen /> : null}
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