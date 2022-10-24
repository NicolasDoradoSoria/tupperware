import React, { useContext, useState, useRef } from "react";
import Style from "./Style";
import { useNavigate } from "react-router-dom";
import { CardMedia, CardContent, Typography, Button, Card, Grow, CircularProgress } from "@material-ui/core";
import UserContext from "../../context/productsContext/userContext/UserContext";
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

  const { name, images, price, _id, stock, category } = product;

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
          { "id": _id },
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
      </div>
      {/* NOMBRE */}
      <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
        {name}
      </Typography>
      {/* </Link> */}

      <CardContent className={classes.content} >
        {/* PRECIO */}
        <Typography variant="h5" component="h2" className={classes.price}>
          ${price}
        </Typography>
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
        <CircularProgress
          size={50}
          className={classes.circularProgress}
        />
      )}
      <ReusableDialog open={open} onClose={() => setOpen(false)} >
        {success ?
          <Publication idProduct={_id} /> : null}
      </ReusableDialog>
    </Card>
  );
};

export default Product
