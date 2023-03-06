import React, { useContext, useState, useRef } from "react";
import Style from "./Style";
import { useNavigate } from "react-router-dom";
import { CardMedia, CardContent, Typography, Button, Card, Grow, CircularProgress, Backdrop} from "@material-ui/core";
import UserContext from "../../context/userContext/UserContext";
import CartContext from "../../context/cartContext/CartContext";
import Publication from "../publication/Publication"
import ReusableDialog from "../reusableDialog/ReusableDialog"

const Product = ({ product }) => {
  const classes = Style();
  const navigate = useNavigate()

  const timer = useRef();
  //userContext
  const userContext = useContext(UserContext);
  const { user, authenticated } = userContext;

  //cartContext
  const cartContext = useContext(CartContext);
  const { generateOrder } = cartContext

  const { name, images, price, _id, stock, checkedOffer, originalPrice } = product;

  // progres material ui
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // agrega opacidad pasando el mouse por la imagen
  const [cardMediaStyle, setCardMediaStyle] = useState({ opacity: 1 })
  // trancicion de botono vista previa
  const [checked, setChecked] = useState(false);

  // ventana de dialogo de publicacion
  const [open, setOpen] = useState(false);

  // desabilita los botones que no tengan stock
  const disableButton = () => stock === 0

  // agregamos el producto al carrito directamente por default se agrega 1
  const addCartClick = () => {

    // si esta autenticado directamente agrega al carrito si no manda al usuario a la ventana de login
    if (authenticated) {
      const order = {
        "user": user.user._id,
        "products": [
          {
            "id": _id,
            "quantity": 1
          },
        ],
        "total": 133,
      }
      generateOrder(order)
    }
    else {
      navigate("/login")
    }

  }
  // al pasar el mouse por una imagen
  const handleOnMouseEnter = () => {
    setChecked(true);
    setCardMediaStyle({ opacity: 0.5, transition: `opacity 1000ms ease-in-out` })
  }

  // al sacar el mouse de la imagen
  const handleOnMouseLeave = () => {
    setChecked(false);
    setCardMediaStyle({ opacity: 1, transition: `opacity 1000ms ease-in-out` })
  }

  // al hacer click en la imagen navega hacial el componente publication 
  const navigatePublication = () => navigate(`/main/descripcion-producto/${_id}`)

  // esto hace que haga el efecto de progress y ademas activa el dialog
  const handleButtonClick = () => {
    setOpen(true)
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  }

  return (
    <Card className={classes.root} >

      <div className={classes.cardMediaContainer} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
        <CardMedia
          className={classes.media}
          image={`http://localhost:4000/${images[0].fileName}`}
          title="Paella dish"
          style={cardMediaStyle}
          onClick={navigatePublication}
        />
        <Grow in={checked} timeout={1000}>
          <Button
            className={classes.quickViewButton}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleButtonClick}
          >Vista Previa</Button>
        </Grow>
        {/* CARTEL DE OFERTA! */}
        {checkedOffer ?
          <div className={classes.imagePosterConteiner}>
            <Typography variant="subtitle1" gutterBottom className={classes.imagePoster}>
              Oferta!
            </Typography>
          </div>
          : null}
      </div>
      {/* NOMBRE */}
      <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
        {name}
      </Typography>
      {/* </Link> */}

      <CardContent className={classes.content} >
        
        <div className={classes.priceContainer}>
          {/* PRECIO ORIGINAL SIN OFERTA */}
          {checkedOffer ?
            <Typography variant="subtitle1" gutterBottom className={classes.offer}>
              ${originalPrice}
            </Typography>
            : null}
          {/* PRECIO */}
          <Typography variant="h5" component="h2" className={classes.price}>
            ${price}
          </Typography>
        </div>
        {/* BOTON AGREGAR */}
        <Button
          className={classes.button}
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          disabled={disableButton()}
          onClick={addCartClick}
        >
          {stock !== 0 ? <>Agregar</> : <>No disponible</>}
        </Button>
      </CardContent>
      {loading && (
        <Backdrop className={classes.backdrop} open={open} size={50}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <ReusableDialog open={open} onClose={() => setOpen(false)} >
        {success ? <Publication idProduct={_id} /> : null}
      </ReusableDialog>
    </Card>
  );
};
export default Product
